## 安全优化

- 登录密码设置 rsa 加密
- cookie 设置 secure 为 true(只有 https 的网址设置为 true,内部 ip 地址部署时 http 的设置为 false)
- 前端路由不使用通用词 如/login
- 账号密码不使用通用词如：admin admin123 等
- 前端打包文件放到服务器的二级目录下(把 vue 文件打包名称改为 test 外层新建一个 dist 文件，test 放入 dist 文件中，访问的域名就变成了 https://域名/test)
