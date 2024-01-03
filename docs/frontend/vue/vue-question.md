
## 防止按钮多次点击
```js
// 自定义一个指令 防止重复点击
export default {
  inserted(button, binding) {
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

## el-select多选隐藏被禁用选项的关闭按钮
```js
export default {
  // 当绑定元素插入到 DOM 中。
  inserted(el, binding) {
    // console.log(el)
  },
  update(el, binding) {
    const domSelect = el.children[0].children[0]
    domSelect.children.forEach(item => {
      // console.log("🚀 ~ item:", item.children[0].innerText)
      binding.value.forEach(listItem => {
        if(listItem.disabled){
          if(listItem.roleName == item.children[0].innerText){
            item.children[1] ? item.children[1].style.display = 'none' : ''
            // console.log("🚀 ~ item.children[1].style:", item.children[1])
          }
        }
      })
    })
  }
}
```