import { genChartByAiUsingPost } from '@/services/aurora_bi/chartController';
import { Avatar, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Settings: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values,
      upload: undefined,
    };
    try {
      // 需要取到上传的原始数据file→file→originFileObj(原始数据)
      const res = await genChartByAiUsingPost(params, {}, values.upload.file.originFileObj);
      // 正常情况下，如果没有返回值就分析失败，有，就分析成功
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        }
      }
      // 异常情况下，提示分析失败+具体失败原因
    } catch (e: any) {
      message.error('分析失败,' + e.message);
    }
    setSubmitting(false);
  };

  return (
    // 把页面内容指定一个类名add-chart
    <div className="profile-settings">
      {/*<div style={{ fontSize: 20}}> 用户基本信息设置</div>*/}
      <Form
        {...formItemLayout}
        name="settings"
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        validateMessages={validateMessages}
      >
        <Form.Item label="用户信息设置">
          <span className="ant-form-text"></span>
        </Form.Item>



        <Form.Item name="userName" label="昵称">
          <Input />
        </Form.Item>

        <Form.Item name="profile" label="简介">
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>
      </Form>

      <Avatar
        size={{ xs: 48, sm: 64, md: 80, lg: 140, xl: 180, xxl: 220 }}
        icon={<AntDesignOutlined />}
        src={"https://tupian.qqw21.com/article/UploadPic/2020-11/202011222253063891.jpg"}
      />

    </div>
  );
};
export default Settings;
