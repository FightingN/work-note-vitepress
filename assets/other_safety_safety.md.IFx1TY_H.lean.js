import{_ as a,o as s,c as r,k as e,a as t}from"./chunks/framework.4Tex8Uls.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"other/safety/safety.md","filePath":"other/safety/safety.md"}'),l={name:"other/safety/safety.md"},n=e("h2",{id:"安全优化",tabindex:"-1"},[t("安全优化 "),e("a",{class:"header-anchor",href:"#安全优化","aria-label":'Permalink to "安全优化"'},"​")],-1),o=e("ul",null,[e("li",null,"登录密码设置 rsa 加密"),e("li",null,"cookie 设置 secure 为 true(只有 https 的网址设置为 true,内部 ip 地址部署时 http 的设置为 false)"),e("li",null,"前端路由不使用通用词 如/login"),e("li",null,"账号密码不使用通用词如：admin admin123 等"),e("li",null,[t("前端打包文件放到服务器的二级目录下(把 vue 文件打包名称改为 test 外层新建一个 dist 文件，test 放入 dist 文件中，访问的域名就变成了 "),e("a",{href:"https://xn--eqrt2g/test",target:"_blank",rel:"noreferrer"},"https://域名/test"),t(")")])],-1),i=[n,o];function c(d,f,h,_,p,u){return s(),r("div",null,i)}const k=a(l,[["render",c]]);export{y as __pageData,k as default};