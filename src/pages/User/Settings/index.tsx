import {
  updateMyUserAvatarUsingPost,
  updatePwdMyUserUsingPost,
} from '@/services/aurora_bi/userController';
import { useModel } from '@@/exports';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  message,
  Space,
  Upload,
  UploadFile,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
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

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  // children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    // children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('修改信息', 'info', <UserOutlined />),
  getItem('修改密码', 'pwd', <KeyOutlined />),
];
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/bmp' ||
    file.type === 'image/webp';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/BMP/WEBP file!');
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error('Image must smaller than 1MB!');
  }
  return isJpgOrPng && isLt1M;
};

const Settings: React.FC = () => {
  const [pwdForm] = Form.useForm();
  const [infoForm] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  let { currentUser } = initialState ?? { userName: '未命名用户' };

  const [imageUrl, setImageUrl] = useState<string>(currentUser?.userAvatar ?? '');
  //必须！要在主函数里。。。
  const [menuKey, setMenuKey] = useState<string>('info');
  const onSelect = (values: any) => {
    // function({ item, key, keyPath, selectedKeys, domEvent })
    setMenuKey(values.key);
  };

  // infoForm.setFieldsValue({
  //   userProfile: currentUser?.userProfile,
  //   userName: currentUser?.userName,
  // });
  const onFinish = async (values: any) => {
    let file;
    if (imageUrl !== '' && imageUrl !== currentUser?.userAvatar) {
      file = values.avatarFile?.file?.originFileObj;
    }
    const params = {
      userName: values.userName,
      userProfile: values.userProfile,
      // ...values,
      userAvatar: undefined,
    };
    //校检吗
    const msg = await updateMyUserAvatarUsingPost(params, {}, file);
    if (msg.code === 0) {
      message.success('修改信息成功！');
      // currentUser  = useModel('@@initialState').initialState.currentUser;
      // console.log(currentUser);
      //然后应该清除输入
      // currentUser.userName = values.userName;
      // currentUser.userProfile = values.userProfile;
      // infoForm.resetFields();
      // infoForm.setFieldsValue({
      //   userProfile: currentUser?.userProfile,
      //   userName: currentUser?.userName,
      // });
      window.location.reload();
    } else {
      message.error('修改信息失败，请重试：' + msg.message);
    }
  };
  const changePwd = async (values: API.UserPwdUpdateMyRequest) => {
    const userPassword = values.userPassword;
    const newPassword = values.newPassword;
    const checkedNewPassword = values.checkedNewPassword;
    try {
      if (
        (userPassword && userPassword.length < 3) ||
        (newPassword && newPassword.length < 3) ||
        (checkedNewPassword && checkedNewPassword.length < 3)
      ) {
        message.error('密码长度不符合要求！（大于等于3位）');
        return;
      }
      if (newPassword !== checkedNewPassword) {
        message.error('两次输入的新密码不一致！');
        return;
      }
      const msg = await updatePwdMyUserUsingPost(values);
      if (msg.code === 0) {
        message.success('修改密码成功！');
        //然后应该清除输入
        pwdForm.resetFields();
      } else {
        message.error('修改密码失败，请重试：' + msg.message);
      }
    } catch (e) {
      console.log(e);
      message.error('修改密码失败，请重试');
    }
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (values: any) => {
    const file = values.file;
    if (file.status === 'done') {
      console.log(file);
      const url = await getBase64(file.originFileObj);
      console.log(url);
      setImageUrl(url);
    }
  };

  return (
    <div className="profile-settings">
      <Content>
        <Layout style={{ padding: '0px 0' }}>
          <Sider width={200} style={{ background: 'white' }}>
            <Menu
              mode="vertical"
              defaultSelectedKeys={['1']}
              style={{ height: '100%' }}
              items={items}
              onSelect={onSelect}
            />
          </Sider>
          <>
            <Content style={{ padding: '0 24px', minHeight: 280, background: 'white' }}>
              {menuKey === 'info' && (
                <div
                  style={{
                    padding: 44,
                    minHeight: 360,
                    // display: 'flex',
                    alignItems: 'center                         ',
                    justifyContent: 'center',
                  }}
                >
                  <Form
                    form={infoForm}
                    {...formItemLayout}
                    name="settings"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                    initialValues={{
                      userProfile: currentUser?.userProfile,
                      userName: currentUser?.userName,
                    }}
                    // validateMessages={validateMessages}
                  >
                    <Form.Item
                      wrapperCol={{ span: 24, offset: 13 }}
                      name="avatarFile"
                      //`value` is not a valid prop, do you mean `fileList`?
                      // valuePropName="fileList"
                      //(fileList || []).forEach is not a function
                      // getValueFromEvent={(e) => {
                      //   if (Array.isArray(e)) {
                      //     return e;
                      //   }
                      //   return e && e.fileList;
                      // }}
                      //后来我发现最好的方式是----不管这两个报错。
                    >
                      <Upload
                        name="file"
                        listType="picture-circle"
                        // className="avatar-uploader"
                        showUploadList={false}
                        // action="#"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        maxCount={1}
                        isImageUrl={(file: UploadFile) => {
                          return true;
                        }}
                      >
                        {/*{imageUrl && <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />}*/}
                        {/*<Avatar src={currentUser?.userAvatar} size={100} />*/}
                        <Avatar src={imageUrl} size={100} />
                      </Upload>
                    </Form.Item>

                    <div
                      style={{
                        color: 'gray',
                        textAlign: 'center',
                      }}
                    >
                      点击图片修改头像(仅支持JPG/PNG格式)
                    </div>

                    <Divider />

                    <Form.Item name="userName" label="昵称">
                      <Input
                        // defaultValue={currentUser?.userName}
                        placeholder={currentUser?.userName}
                      />
                    </Form.Item>

                    <Form.Item name="userProfile" label="简介">
                      <Input.TextArea
                        showCount
                        maxLength={200}
                        // defaultValue={currentUser?.userProfile}
                        placeholder={currentUser?.userProfile}
                      />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          修改
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </div>
              )}
              {menuKey === 'pwd' && (
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    // display: 'flex',
                    alignItems: 'center                         ',
                    justifyContent: 'center',
                  }}
                >
                  <Form
                    form={pwdForm}
                    {...formItemLayout}
                    name="settings"
                    onFinish={changePwd}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                    // validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="userPassword"
                      label="请输入旧密码"
                      rules={[
                        { required: true, message: '请输入旧密码!' },
                        {
                          min: 3,
                          type: 'string',
                          message: '长度不能小于 3',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      label="请输入新密码"
                      rules={[
                        { required: true, message: '请输入新密码!' },
                        {
                          min: 3,
                          type: 'string',
                          message: '长度不能小于 3',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="checkedNewPassword"
                      label="确认新密码"
                      rules={[{ required: true, message: '请再次确认密码!' },{
                        min: 3,
                        type: 'string',
                        message: '长度不能小于 3',
                      },]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          修改
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </Content>
          </>
        </Layout>
      </Content>
    </div>
  );
};
export default Settings;
