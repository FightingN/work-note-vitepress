const navConf = require("./config/navConf.js");
module.exports = {
  base: "/work-note-vitepress/",
  themeConfig: {
    nav: navConf,
    sidebar: {
      "/frontend/css/": [
        {
          text: "CSS相关",
          items: [
            {
              text: "css相关",
              link: "/frontend/css/css-summary",
            },
          ],
        },
        {
          text: "CSS相关2",
          items: [
            {
              text: "css相关",
              link: "/frontend/css/css-advanced",
            },
          ],
        },
      ],
      "/frontend/vue/": [
        {
          text: "vue2总结",
          items: [
            {
              text: "vue相关",
              link: "/frontend/vue/vue-basics",
            },
          ],
        },
        {
          text: "vue3学习",
          items: [
            {
              text: "vue3学习",
              link: "/frontend/vue/vue3-base",
            },
          ],
        },
        {
          text: "vue3总结",
          items: [
            {
              text: "vue3总结",
              link: "/frontend/vue/vue3-summary",
            },
          ],
        },
      ],
    },
  },
};
