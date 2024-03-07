<script setup>
import { withBase } from 'vitepress'
</script>

## 防止按钮多次点击
::: tip 问题说明：
表单在提交时，快速重复点击提交按钮会导致数据多次提交。
:::
1. 在项目中src > directive文件下新建addButton文件夹
2. 在新建的addButton文件夹中新建preventReClick.js文件 写入以下代码
```js
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

3. 在src > directive > index.js文件中引入
```js
import preventReClick from './addButton/preventReClick'
const install = function (Vue) {
  Vue.directive('preventReClick', preventReClick)
}

if (window.Vue) {
  Vue.use(install) // eslint-disable-line
}

export default install
```

4. 在src > main.js文件 引入
```js
import directive from './directive' //directive
Vue.use(directive)
```

5. 在页面中使用v-preventReClick指令，'2500'可根据实际情况自行传值
```html
<el-button v-preventReClick="2500" @click="submitForm">确 定</el-button>
```


## el-select多选隐藏被禁用选项的关闭按钮
<img :src="withBase('/img/vueImg/selectClose.png')" alt="图片描述">

::: tip 问题说明：
班组用户可以设置多个角色当有一个角色被取消时，用户管理的角色回显只会显示出id，用户体验不友好，最后决定把效果做成被取消的那个角色显示出名字，且是禁用没有关闭按钮。
:::
1. 在项目中src > directive文件下新建elSelect文件夹
2. 在新建的elSelect文件夹中新建selectClose.js文件 写入以下代码
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

3. 在src > directive > index.js文件中引入
```js
import selectClose from './elSelect/selectClose'
const install = function (Vue) {
  Vue.directive('selectClose', selectClose)
}

if (window.Vue) {
  Vue.use(install) // eslint-disable-line
}

export default install
```

4. 在src > main.js文件 引入
```js
import directive from './directive' //directive
Vue.use(directive)
```

5. 在页面中使用v-selectClose指令: 第一个值为v-model的绑定值，第二个值为el-option所循环的数组
```html
<el-select v-model="form.roleIds" v-selectClose="(form.roleIds, roleListCopy)" multiple placeholder="请选择角色">
  <el-option v-for="item in roleListCopy" :key="Math.floor(Math.random()*1000) + item.roleName" :label="item.roleName" :value="item.roleId" :disabled="item.disabled"></el-option>
</el-select>
```


## el-input输入框仅允许输入数字
::: tip 问题说明：
当输入框的内容只允许输入数字时（如根据id查询列表）。
:::
1.给el-input标签绑定input事件
```html
<el-form-item label="事项ID" prop="id">
  <el-input v-model.trim="queryParams.id" @input="handleInput" />
</el-form-item>
```

2.在页面中写入input事件对应的"handleInput"方法
```js
handleInput() {
  this.queryParams.id = this.queryParams.id.replace(/\D/g, '')
}
```


## 点击删除按钮弹出提示框后摁下空格/回车会执行确认删除的操作问题
<img :src="withBase('/img/vueImg/btnDel.png')" alt="图片描述">

::: tip 问题说明：
在一个列表中，点击其中一条数据后方的删除按钮后，摁下回车/空格会导致数据删除。
:::
1.在项目中App.vue文件中写入以下代码
```js
mounted() {
  window.addEventListener('keydown', (e) => {
    if (e.target.nodeName === 'BUTTON') {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
      }
    }
  })
},
```