import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Aurora AI数据可视化平台~';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Aurora Search',
          title: 'Aurora Search',
          href: 'http://search.soogyu.xyz/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Pani-s',
          blankTarget: true,
        },
        {
          key: 'Click me',
          title: 'blog',
          href: 'http://47.120.1.185:8090/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
