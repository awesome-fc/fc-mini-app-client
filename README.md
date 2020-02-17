# TODO List Miniapp Client

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/29608/1579083525619-0efea0d9-ebdf-4c44-a1e7-daea660b0e52.png)

根据[小程序服务端模板](http://gitlab.alibaba-inc.com/awesome-fc/mini-app-todo-list-server)成功部署了服务后，我们只需要在客户端进行简单的配置，就可以访问。

## 使用方法

### 1. 安装依赖

在小程序项目根目录下，安装[fc-nodejs-sdk](https://github.com/aliyun/fc-nodejs-sdk/tree/mini-app):

```sh
npm install git://github.com/aliyun/fc-nodejs-sdk.git#mini-app --save
```

### 2. 填写信息

1. 把[server.js](server.js)拷贝到小程序项目根目录下，与`app.js`在并列
2. 修改server.js开头定义的变量，这些值会在[服务端模板](http://gitlab.alibaba-inc.com/awesome-fc/mini-app-todo-list-server)部署成功后自动输出：

|信息|说明|
|----|----|
|fcAccountId|阿里云AccountId|
|fcRegion|函数部署的区域，例如`cn-shanghai`|
|fcServiceName|函数计算服务名称|
|sessionFunctionName|session函数的名称，例如session|
|dbFunctionName|db函数的名称，例如db|

### 3. 嵌入代码

在`app.js`中引入修改好的[server.js](server.js)，然后在用户授权通过时，对server进行初始化，参考[app.js](app.js)。

然后在需要访问数据时，通过`app.server.db()`进行访问，例如在获取TODO列表时：

```js
  onShow() {
    // 设置全局数据到当前页面数据
    app.server.db('list', {}, (err, res) => {
      var todos = res.data.data.map(item => {
        return {id: item.id, text: item.content, completed: item.completed === 'true'};
      });
      this.setData({todos: todos});
    });
  },
```

### 4. 发布

由于[fc-nodejs-sdk](https://github.com/aliyun/fc-nodejs-sdk/tree/mini-app)使用了ES6语法，在发布小程序时，需要在小程序项目的根目录下，新建一个文件mini.project.json，填入以下内容：

```js
{
  "node_modules_es6_whitelist": [
    "@alicloud/fc2"
  ]
}
```

## 问题反馈

- https://help.aliyun.com/document_detail/53087.html
