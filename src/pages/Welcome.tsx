import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Card, Divider, Image, Space, theme} from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */


const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -3%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '300px auto',
            backgroundImage:
            "url('http://pics.soogyu.xyz/meme/20120314203428_E82hH-removebg-preview.png')",
              // "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            Hello ~ 欢迎来到 Aurora BI &#128523;
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '28px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Aurora BI 是一个基于 Spring Boot + MQ + AIGC（+ React）的智能数据分析平台。 区别于传统
            BI，用户只需要导入原始数据集、并输入分析诉求，就能自动生成可视化图表及分析结论，
            旨在实现数据分析的降本增效、降低数据分析的人工成本、提高数据分析效率~~~
            <br/><br/><br/>
            <b>已有功能</b><br/>
            · 智能分析（同步）：根据用户上传csv文件传入AI分析生成对应的]SON数据，并
            使用ECharts图表将分析结果可视化展示<br/>
            · 智能分析（异步--线程池）：使用了线程池异步生成图表<br/>
            · 智能分析（异步--消息队列）：将线程池改造成使用<br/>
            RabbitMQ分布式消息队列异步处理、保证消息的可靠性
            · 用户限流：本项目采用Redission实现简单且高效的分布式限流，策略是单个用户
            一秒只能执行两次生成图表操作，底层是令牌桶算法。<br/>
            · 数据压缩：使用Easy Excel解析用户上传的LSX表格数据文件并压缩为CSV,
            实测提高了20%的单次输入数据量、并节约了成本。<br/>
            · 支持用户自己查看所有生成的图表<br/>
          </p>
          <Divider />
          <b>预览</b>
          <br /><br />
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Image
              width={600}
              src="http://pics.soogyu.xyz/picgo/bi_sample_sync.PNG"
            />
            <br />
            <Image
              width={600}
              src="http://pics.soogyu.xyz/picgo/bi_sample_async_mq.PNG"
            />
            <br />
            <Image
              width={600}
              src="http://pics.soogyu.xyz/picgo/bi_sample_mychart.PNG"
            />
          </Space>
          <div></div>
          <Divider />
          <b>技术选型</b>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            <b>前端</b>
            <br />
            · React 18
            <br />
            · Ant Design Pro5.x 脚手架
            <br />
            · Umi4 前端框架
            <br />
            · Ant Design 组件库
            <br />
            · Echarts 可视化库
            <br />
            · OpenAPI 前端代码生成
            <br />
            <br />
            <b>后端</b>
            <br />
            · Java Spring Boot
            <br />
            · MySQL 数据库
            <br />
            · MyBatis-Plus 及 MyBatis X 自动生成
            <br />
            · Redis+Redisson 限流
            <br />
            · RabbitMQ 消息队列
            <br />
            · AI SDK (AI能力)
            <br />
            · JDK 线程池及异步化
            <br />
            · Easy Excel 表格数据处理
            <br />
            · Swagger+Knife4j 接口文档生成
            <br />
            · Hutool、Apache Common Utils 等工具库
            <br />
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
          </div>
          <Image
            width={200}
            src="http://pics.soogyu.xyz/meme/%E5%91%B5%E5%91%B5%E5%91%B5%E5%91%B5%E5%91%B5.jpg"
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
