<script setup>
import { withBase } from 'vitepress'
</script>

## 按钮点击后不会自动失焦问题
<img :src="withBase('/img/vueImg/btnFocus.png')" alt="图片描述">

::: tip 问题说明：
激活中心在点击按钮后，需要再点击页面空白处才会让按钮失焦，用户体验感不好。
:::
1. 在项目中src > directive文件下新建button文件夹
2. 在新建的button文件夹中新建btnFocus.js文件 写入以下代码
```js
export default {
  mounted(el, binding, vnode) {
    el.addEventListener('focus', btnFocus)
  },
  unmounted(el) {
    el.removeEventListener('focus', btnFocus)
  }
}
function btnFocus(evt) {
  let target = evt.target
    if (target.nodeName == 'SPAN') {
      target = evt.target.parentNode
    }
  target.blur()
}
```

3. 在src > directive > index.js文件中引入
```js
import btnFocus from "./button/btnFocus";
export default function directive(app) {
  app.directive("btnFocus", btnFocus);
}
```

4. 在src > main.js文件 引入
```js
import directive from './directive' //directive
Vue.use(directive)
```

5. 在页面中使用v-btnFocus
```html
<el-button v-btnFocus @click="handleAdd">新增</el-button>
```

## 防止按钮多次点击
::: tip 问题说明：
表单在提交时，快速重复点击提交按钮会导致数据多次提交。
:::
1. 在项目中src > directive文件下新建button文件夹
2. 在新建的button文件夹中新建preventReClick.js文件 写入以下代码
```js
export default {
  mounted(button, binding) {
    button.addEventListener('click', () => {
      if (!button.disabled) {
        button.disabled = true
        button.style.cursor = 'not-allowed'
        clearTimeout(button.timeId)
        button.timeId = setTimeout(() => {
          button.disabled = false
          button.style.cursor = 'default'
        }, binding.value || 1000)
      }
    })
  },
}
```

3. 在src > directive > index.js文件中引入
```js
import preventReClick from "./button/preventReClick";
export default function directive(app) {
  app.directive("preventReClick", preventReClick);
}
```

4.在src > main.js文件 引入
```js
import directive from './directive' //directive
Vue.use(directive)
```

5.在页面中使用v-preventReClick，'2500'可根据实际情况自行传值
```html
<el-button v-preventReClick="2500" @click="submitForm">确 定</el-button>
```

## el-input-number禁止输入e、+、-
#### 方案一：
1. 在项目中src > directive文件下新建inputNumber文件夹
2. 在新建的inputNumber文件夹中新建index.js文件 写入以下代码
```js
export default {
  mounted(el, binding) {
    el.addEventListener("keydown", handleKeydown);
  },
  unmounted(el) {
    el.removeEventListener("keydown", handleKeydown);
  },
};
function handleKeydown(e) {
  // 输入框中禁止输入e、+、-
  let key = e.key;
  if (key === "e" || key === "E" || key === "+" || key === "-") {
    e.preventDefault();
  }
}
```

3. 在src > directive > index.js文件中引入
```js
import inputNumber from "./inputNumber/index";
export default function directive(app) {
  app.directive("inputNumber", inputNumber);
}
```

4. 在src > main.js文件 引入
```js
import directive from './directive' //directive
Vue.use(directive)
```

5. 在页面使用el-input-number处写入 v-inputNumber 
6. 同时写入@keyup="iptNumberBlur"解决中文时输入e的问题
```html
<el-input-number v-inputNumber @keyup="onHandleBlur" v-model.trim="form.addSize" :step="1"/>
```

7. @keyup="iptNumberBlur"对应的iptNumberBlur方法
```js
function iptNumberBlur(e) {
  e.target.value = e.target.value.replace(/[^\d]/g, "");
  if (e.target.value == null || e.target.value == '') {
    form.value.sortNum = null
  }
}
```

#### 方案二：
1. 在App.vue中写入
```js
window.addEventListener('keydown', (e) => {
  if (e.target.nodeName === 'INPUT') {
    if(e.target.type == 'number'){
      if(window.event.keyCode == 69 || window.event.keyCode == 187 || window.event.keyCode == 189){ // 禁用e + - 避免科学计数法
        e.preventDefault()
      }
    }
  }
})
```

2. 在页面使用el-input-number处写入 @keyup="iptNumberBlur 解决中文时输入e的问题
```html
<el-input-number @keyup="iptNumberBlur" v-model="form.sortNum" :precision="0" placeholder="请输入排序字段" />
```

3. @keyup="iptNumberBlur"对应的iptNumberBlur方法
```js
function iptNumberBlur(e) {
  e.target.value = e.target.value.replace(/[^\d]/g, "");
  if (e.target.value == null || e.target.value == '') {
    form.value.sortNum = null
  }
}
```

## 表单输入框特殊字符校验
1. 在页面相应表单规则处写入即可
```js
rules: {
  projectName: [
    { required: true, message: "xxx不能为空", trigger: 'blur' },
    { validator: (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
        if (!reg.test(value)) {
          callback(new Error('只允许填写汉字、字母、数字'))
        } else {
          callback()
        }
      }, 
      trigger: 'change' 
    }
  ],
}
```