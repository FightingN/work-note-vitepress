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
问题说明：班组用户可以设置多个角色当有一个角色被取消时，用户管理的角色回显只会显示出id，用户体验不友好，最后决定把效果做成被取消的那个角色显示出名字，且是禁用没有关闭按钮。
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