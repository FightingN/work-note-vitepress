const navConf = require("./config/navConf.js");
module.exports = {
  base: "/work-note-vitepress/",
  themeConfig: {
    nav: navConf,
    siteTitle: "前端奇思妙想",
    sidebar: {
      "/frontend/css/": [
        {
          text: "CSS",
          items: [
            {
              text: "CSS项目问题记录",
              link: "/frontend/css/css-question",
            },
          ],
        },
      ],
      "/frontend/js/": [
        {
          text: "JS",
          items: [
            {
              text: "常用方法封装",
              link: "/frontend/js/js-method",
            },
          ],
        },
      ],
      "/frontend/es6/": [
        {
          text: "ES6",
          items: [
            {
              text: "数组相关",
              link: "/frontend/es6/es6-arr",
            },
            {
              text: "es6总结",
              link: "/frontend/es6/es6",
            },
          ],
        },
      ],
      "/frontend/vue/": [
        {
          text: "vue2问题相关",
          items: [
            {
              text: "问题记录",
              link: "/frontend/vue/vue-question",
            },
          ],
        },
        {
          text: "vue2知识点相关",
          items: [
            {
              text: "知识点记录",
              link: "/frontend/vue/vue-study",
            },
          ],
        },
        {
          text: "vue3问题相关",
          items: [
            {
              text: "问题记录",
              link: "/frontend/vue/vue3-question",
            },
          ],
        },
        {
          text: "vue3知识点相关",
          items: [
            {
              text: "知识点记录",
              link: "/frontend/vue/vue3-study",
            },
          ],
        },
      ],
      "IOS/Object-C": [
        {
          text: "IOS",
          items: [
            {
              text: "Object-C",
              link: "/IOS/Object-C/oc-question",
            },
            {
              text: "Mac",
              link: "/IOS/Object-C/mac-question",
            },
            {
              text: "智慧班组",
              link: "/IOS/Object-C/teammeeting",
            },
          ],
        },
      ],
      "/other/regular/": [
        {
          text: "正则规则",
          items: [
            {
              text: "通用正则",
              link: "/other/regular/regular-check",
            },
          ],
        },
      ],
      "/other/safety/": [
        {
          text: "网站安全",
          items: [
            {
              text: "网站安全",
              link: "/other/safety/safety",
            },
          ],
        },
      ],
    },
    footer: {
      message: "勤勤恳恳的小码农",
      copyright: "先占个位置吧",
    },
  },
};
