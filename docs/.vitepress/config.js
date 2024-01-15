const navConf = require("./config/navConf.js");
module.exports = {
  base: "/work-note-vitepress/",
  themeConfig: {
    nav: navConf,
    sidebar: {
      "/frontend/css/": [
        {
          text: "CSS",
          items: [
            {
              text: "CSS问题记录",
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
  },
};
