# Aurora AI数据可视化平台前端

## 项目介绍

后端：[Pani-s/aurora-bi-backend: Aurora AI数据可视化平台后端 (github.com)](https://github.com/Pani-s/aurora-bi-backend)

### 介绍:

基于 **React+Spring Boot+MQ+AIGC** 的智能数据分析平台。
区别于传统BI,用户只需要导入原始数据集、并输入分析诉求，就能自动生成可视化图表及分析结论，实现数据分
析的降本增效。

AIGC : AI生成内容。

**优势：** 让不会数据分析的用户也可以通过输入目标快速完成数据分析，大幅节约人力成本，将会用到 AI 接口生成分析结果

### ***预览图：***

<img src="http://pics.soogyu.xyz/picgo/bi_sample_sync.PNG" style="zoom: 50%;" />

<img src="http://pics.soogyu.xyz/picgo/bi_sample_async_mq.PNG" style="zoom: 50%;" />

<img src="http://pics.soogyu.xyz/picgo/bi_sample_mychart.PNG" style="zoom: 50%;" />

## 项目架构

**异步化**

客户端输入分析诉求和原始数据，向业务后端发送请求。业务后端将请求事件放入消息队列，并为客户端生成取餐号，让要生成图表的客户端去排队，消息队列根据I服务负载情况，定期检查进度，如果AI服务还能处理更多的图表生成请求，就向任务处理模块发送消息。

任务处理模块调用AI服务处理客户端数据，AI 服务异步生成结果返回给后端并保存到数据库，当后端的AI工服务生成完毕后，可以通过向前端发送通知的方式，或者通过业务后端监控数据库中图表生成服务的状态，来确定生成结果是否可用。若生成结果可用，前端即可获取并处理相应的数据，最终将结果返回给客户端展示。在此期间，用户可以去做自己的事情。

<img src="http://pics.soogyu.xyz/pani/bi/bi_structrue.png" style="zoom: 50%;" />

## 技术栈

### **前端**
- React 18
- Ant Design Pro5.x 脚手架
- Umi4 前端框架
- Ant Design 组件库
- Echarts 可视化库
- OpenAPI 前端代码生成

### **后端**
- Java Spring Boot
- MySQL 数据库
- MyBatis-Plus 及 MyBatis X 自动生成
- Redis+Redisson 限流
- RabbitMQ 消息队列
- AI SDK (AI能力)
- JDK 线程池及异步化
- Easy Excel 表格数据处理
- Swagger+Knife4j 接口文档生成
- Hutool、Apache Common Utils 等工具库

**数据存储**

- MySQL 数据库
- 七牛云 对象存储



## 项目核心亮点

- 自动化分析：通过AI技术，将传统繁琐的数据处理和可视化操作自动化，使得数据分析过程更加高效、快速和准确。
- 一键生成：只需要导入原始数据集和输入分析目标，系统即可自动生成符合要求的可视化图表和分析结论，无需手动进行复杂的操作和计算。
- 可视化管理：项目提供了图表管理功能，可以对生成的图表进行整理、保存和分享，方便用户进行后续的分析和展示。
- 异步生成：项目支持异步生成，即使处理大规模数据集也能保持较低的响应时间，提高用户的使用体验和效率。



## 项目启动

### 前端

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
