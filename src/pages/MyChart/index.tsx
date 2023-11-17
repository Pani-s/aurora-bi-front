import { listMyChartByPageUsingPost } from '@/services/aurora_bi/chartController';
import { ReloadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {Avatar, Button, Card, Col, List, message, Result, Row} from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */

const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  // @ts-ignore
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPost(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        // @ts-ignore
        setTotal(res.data.total ?? 0);
        // 隐藏图表的 title
        if (res.data.records) {
          res.data.records.forEach((data) => {
            // 要把后端返回的图表字符串改为对象数组,如果后端返回空字符串，就返回'{}'
            const chartOption = JSON.parse(data.genChart ?? '{}');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);
          });
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败，' + e.message);
    }
    setLoading(false);
  };

  //定时器
  const [count, setCount] = useState(0);
  const useInterval = (cb: Function, time = 1000) => {
    const cbRef = useRef<Function>();
    useEffect(() => {
      cbRef.current = cb;
    });
    useEffect(() => {
      const callback = () => {
        cbRef.current?.();
      };
      const timer = setInterval(() => {
        callback();
      }, time);
      return () => clearInterval(timer);
    }, []);
  };

  useInterval(() => {
    setCount(count + 1);
    // console.log("[定时刷新支棱起来求你] count = ",count);
    if (count === 7) {
      loadData();
      setCount(0);
    }
  }, 1000);

  //钩子。useEffect
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    /*
        把根结点的类名改为my-chart-page;
          这样就可以新建css文件，通过类名添加样式;
          鱼皮的规范：能使用组件，就不用自己写样式;
          因为现成的组件，都做好了适配,自己写样式要考虑多端不兼容的问题。
        */
    <div className="my-chart-page">
      <div>
        <Row gutter={24}>
          <Col span={20}>
            <Search
              placeholder="请输入图表名称"
              enterButton
              loading={loading}
              onSearch={(value) => {
                // 设置搜索条件
                // @ts-ignore
                setSearchParams({
                  ...initSearchParams,
                  name: value,
                });
              }}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={() => {
                console.log("刷新")
                loadData();
              }}
            />
          </Col>
        </Row>


      </div>
      <div className="margin-16" />
      <List
        /*
          栅格间隔16像素;xs屏幕<576px,栅格数1;
          sm屏幕≥576px，栅格数1;md屏幕≥768px,栅格数1;
          lg屏幕≥992px,栅格数2;xl屏幕≥1200px,栅格数2;
          xxl屏幕≥1600px,栅格数2
        */
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={
                  '图表类型：' +
                  (item.chartType ?? '用户未定义类型') +
                  '   |   创建日期：' +
                  item.createTime
                }
              />
              <>
                {
                  // 当状态（item.chartState）为'wait'时，显示待生成的结果组件
                  item.chartState === 0 && (
                    <>
                      <Result
                        // 状态为警告
                        status="warning"
                        title="待生成"
                        // 子标题显示执行消息，如果执行消息为空，则显示'当前图表生成队列繁忙，请耐心等候'
                        subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                      />
                    </>
                  )
                }
                {item.chartState === 1 && (
                  <>
                    <Result
                      // 状态为信息
                      status="info"
                      title="图表生成中"
                      // 子标题显示执行消息
                      subTitle={item.execMessage ?? '请耐心等候~'}
                    />
                  </>
                )}
                {
                  // 当状态（item.chartState）为succeed'时，显示生成的图表
                  item.chartState === 3 && (
                    <>
                      <div style={{ marginBottom: 16 }} />
                      <p>{'分析目标：' + item.goal}</p>
                      <p style={{ color: 'gray' }}>{'分析结果：' + item.genResult}</p>
                      <div style={{ marginBottom: 16 }} />
                      <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                    </>
                  )
                }
                {
                  // 当状态（item.chartState）为'failed'时，显示生成失败的结果组件
                  item.chartState === 2 && (
                    <>
                      <Result
                        status="error"
                        title="图表生成失败"
                        subTitle={
                          '错误原因：' +
                          item.execMessage +
                          '\n不要沮丧~我们会定时对失败的任务进行重新生成的~请耐心等候'
                        }
                      />
                    </>
                  )
                }
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;
