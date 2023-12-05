import Footer from '@/components/Footer';
import { userRegisterUsingPost } from '@/services/aurora_bi/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { Link } from '@@/exports';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      //哎哟这是背景
      backgroundImage:
        // "url('https://images.weserv.nl/?url=imglf3.lf127.net/img/TUszdkJBZ0ErekVncnlHL0V5elpsVWdVVzRkUFljbTM0S2x1eUtxZituMWlyYlpxL3BKVEpnPT0.jpg?imageView&thumbnail=1744y1268&type=jpg&quality=96&stripmeta=0&type=jpg')",
        "url('https://images.weserv.nl/?url=imglf3.lf127.net/img/R1JHQ29TVG5yQXJXa2NqbktkUFFlRzVFUHdscGg2eittaVBRdXVYM0lMNnQ1WEgwQXNGNnRnPT0.jpg?imageView&thumbnail=1680x0&quality=20&stripmeta=0&type=jpg')",
      // backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      //校检
      if (values.userPassword !== values.checkPassword) {
        message.error('两次输入密码不一致！');
        return;
      }
      // 登录
      const msg = await userRegisterUsingPost(values);
      if (msg.code === 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      } else {
        message.error('注册失败，请重试：' + msg.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
		  submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Aurora BI"
          subTitle={'Aurora AI智能数据分析可视化平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入要注册用户账号：'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入设置的密码：'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 3,
                    type: 'string',
                    message: '长度不能小于 3',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码：'}
                rules={[
                  {
                    required: true,
                    message: '请在此确认密码！',
                  },
                  {
                    min: 3,
                    type: 'string',
                    message: '长度不能小于 3',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to={'/user/login'}>返回登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
