## 按钮点击后不会自动失焦问题
```js
// 1.在项目中src > directive文件下新建button文件夹
// 2.在新建的button文件夹中新建btnFocus.js文件 写入以下代码
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

// 3.在src > directive > index.js文件中引入
import btnFocus from "./button/btnFocus";
export default function directive(app) {
  app.directive("btnFocus", btnFocus);
}

// 4.在src > main.js文件 引入
import directive from './directive' //directive
Vue.use(directive)
```
```html
<!-- 5.在页面中使用v-btnFocus -->
<el-button type="primary" plain icon="Plus" @click="handleAdd" v-btnFocus>新增</el-button>
```

## 防止按钮多次点击
```js
// 1.在项目中src > directive文件下新建button文件夹
// 2.在新建的button文件夹中新建preventReClick.js文件 写入以下代码
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

// 3.在src > directive > index.js文件中引入
import preventReClick from "./button/preventReClick";
export default function directive(app) {
  app.directive("preventReClick", preventReClick);
}

// 4.在src > main.js文件 引入
import directive from './directive' //directive
Vue.use(directive)
```
```html
<!-- 5.在页面中使用v-preventReClick，'2500'可根据实际情况自行传值 -->
<el-button type="primary" @click="submitForm" v-preventReClick="2500">确 定</el-button>
```

## el-input-number禁止输入e、+、-
```js
// 方案一：

// 1.在项目中src > directive文件下新建inputNumber文件夹
// 2.在新建的inputNumber文件夹中新建index.js文件 写入以下代码
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

// 3.在src > directive > index.js文件中引入
import inputNumber from "./inputNumber/index";
export default function directive(app) {
  app.directive("inputNumber", inputNumber);
}

// 4.在src > main.js文件 引入
import directive from './directive' //directive
Vue.use(directive)
```
```html
<!-- 
  5.在页面使用el-input-number处写入 v-inputNumber 
  6.同时写入@keyup="iptNumberBlur"
-->
<el-input-number v-model.trim="form.addSize" :min="1" :max="100" :step="1" @keyup="onHandleBlur" v-inputNumber/>
```
```js
// 7.@keyup="iptNumberBlur"对应的iptNumberBlur方法
function iptNumberBlur(e) {
  e.target.value = e.target.value.replace(/[^\d]/g, "");
  if (e.target.value == null || e.target.value == '') {
    form.value.sortNum = null
  }
}
```
```js
// 方案二：

// 1.在App.vue中写入
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
```html
<!-- 2.在页面使用el-input-number处写入 @keyup="iptNumberBlur" --> 
<el-input-number v-model="form.sortNum" :min="0" :max="999" :precision="0" @keyup="iptNumberBlur" placeholder="请输入排序字段" />
```
```js
// 3.@keyup="iptNumberBlur"对应的iptNumberBlur方法
function iptNumberBlur(e) {
  e.target.value = e.target.value.replace(/[^\d]/g, "");
  if (e.target.value == null || e.target.value == '') {
    form.value.sortNum = null
  }
}
```

## 表单输入框特殊字符校验
```js
// 在表单规则处写入即可
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