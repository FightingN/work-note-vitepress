## 按钮点击后不会自动失焦问题
```js
// 定义一个自定义指令
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

## 防止按钮多次点击
```js
// 自定义一个指令 防止重复点击
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

## el-input-number禁止输入e、+、-
```js
// 在App.vue中写入
window.addEventListener('keydown', (e) => {
  if (e.target.nodeName === 'INPUT') {
    if(e.target.type == 'number'){
      if(window.event.keyCode == 69 || window.event.keyCode == 187 || window.event.keyCode == 189){ // 禁用e + - 避免科学计数法
        e.preventDefault()
      }
    }
  }
})
// 在页面使用el-input-number处写入 @keyup="iptNumberBlur" 
<el-input-number v-model="form.sortNum" :min="0" :max="999" :precision="0" @keyup="iptNumberBlur" placeholder="请输入排序字段" />
function iptNumberBlur(e) {
  e.target.value = e.target.value.replace(/[^\d]/g, "");
  if (e.target.value == null || e.target.value == '') {
    form.value.sortNum = null
  }
}
```

## 表单输入框特殊字符校验
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