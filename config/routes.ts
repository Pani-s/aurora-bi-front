export default [
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { name: '欢迎', icon: 'smile', path: '/welcome', component: './Welcome' },
  { name: '智能分析', icon: 'barChart', path: '/add_chart', component: './AddChart' },

  {
    name: '智能分析（异步-线程池）',
    path: '/add_chart_async',
    icon: 'barChart',
    component: './AddChartAsync',
  },
  {
    name: '智能分析（异步-消息队列）',
    path: '/add_chart_async_mq',
    icon: 'barChart',
    component: './AddChartAsyncMq',
  },
  { name: '我的图表', icon: 'pieChart', path: '/my_chart', component: './MyChart' },
  { name: '个人设置', icon: 'setting', path: '/user/profileSetting', component: './User/Settings' },

  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
