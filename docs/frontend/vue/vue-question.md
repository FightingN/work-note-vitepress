<script setup>
import { withBase } from 'vitepress'
</script>

## 防止按钮多次点击

::: tip 问题说明：
表单在提交时，快速重复点击提交按钮会导致数据多次提交。
:::

1. 在项目中 src > directive 文件下新建 addButton 文件夹
2. 在新建的 addButton 文件夹中新建 preventReClick.js 文件 写入以下代码

```js
export default {
  inserted(button, binding) {
    button.addEventListener("click", () => {
      if (!button.disabled) {
        button.disabled = true;
        button.style.cursor = "not-allowed";
        clearTimeout(button.timeId);
        button.timeId = setTimeout(() => {
          button.disabled = false;
          button.style.cursor = "default";
        }, binding.value || 1000);
      }
    });
  },
};
```

3. 在 src > directive > index.js 文件中引入

```js
import preventReClick from "./addButton/preventReClick";
const install = function (Vue) {
  Vue.directive("preventReClick", preventReClick);
};

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install;
```

4. 在 src > main.js 文件 引入

```js
import directive from "./directive"; //directive
Vue.use(directive);
```

5. 在页面中使用 v-preventReClick 指令，'2500'可根据实际情况自行传值

```html
<el-button v-preventReClick="2500" @click="submitForm">确 定</el-button>
```

## el-select 多选隐藏被禁用选项的关闭按钮

<img :src="withBase('/img/vueImg/selectClose.png')" alt="图片描述">

::: tip 问题说明：
班组用户可以设置多个角色当有一个角色被取消时，用户管理的角色回显只会显示出 id，用户体验不友好，最后决定把效果做成被取消的那个角色显示出名字，且是禁用没有关闭按钮。
:::

1. 在项目中 src > directive 文件下新建 elSelect 文件夹
2. 在新建的 elSelect 文件夹中新建 selectClose.js 文件 写入以下代码

```js
export default {
  // 当绑定元素插入到 DOM 中。
  inserted(el, binding) {
    // console.log(el)
  },
  update(el, binding) {
    const domSelect = el.children[0].children[0];
    domSelect.children.forEach((item) => {
      // console.log("🚀 ~ item:", item.children[0].innerText)
      binding.value.forEach((listItem) => {
        if (listItem.disabled) {
          if (listItem.roleName == item.children[0].innerText) {
            item.children[1] ? (item.children[1].style.display = "none") : "";
            // console.log("🚀 ~ item.children[1].style:", item.children[1])
          }
        }
      });
    });
  },
};
```

3. 在 src > directive > index.js 文件中引入

```js
import selectClose from "./elSelect/selectClose";
const install = function (Vue) {
  Vue.directive("selectClose", selectClose);
};

if (window.Vue) {
  Vue.use(install); // eslint-disable-line
}

export default install;
```

4. 在 src > main.js 文件 引入

```js
import directive from "./directive"; //directive
Vue.use(directive);
```

5. 在页面中使用 v-selectClose 指令: 第一个值为 v-model 的绑定值，第二个值为 el-option 所循环的数组

```html
<el-select
  v-model="form.roleIds"
  v-selectClose="(form.roleIds, roleListCopy)"
  multiple
  placeholder="请选择角色"
>
  <el-option
    v-for="item in roleListCopy"
    :key="Math.floor(Math.random()*1000) + item.roleName"
    :label="item.roleName"
    :value="item.roleId"
    :disabled="item.disabled"
  ></el-option>
</el-select>
```

## el-input 输入框仅允许输入数字

::: tip 问题说明：
当输入框的内容只允许输入数字时（如根据 id 查询列表）。
::: 1.给 el-input 标签绑定 input 事件

```html
<el-form-item label="事项ID" prop="id">
  <el-input
    v-model.trim="queryParams.id"
    @input="(v) => (queryParams.id = v.replace(/[^\d]/g, ''))"
  />
</el-form-item>
```

## el-cascader 多级区域加载的相关问题

::: tip 问题说明：
记录一下 el-cascader 多级区域加载的实现，以及数据清空数据后的样式问题。
:::

```html
<el-form-item label="区域" prop="divisionIds">
  <el-cascader
    v-model="queryParams.divisionIds"
    :options="divisionTreeList"
    :props="divisionProps"
    popper-class="cascader"
    ref="myCascader"
    @change="changeCascaderDivisionIds"
    clearable
    placeholder="请选择区域"
  ></el-cascader>
</el-form-item>
```

1.变量部分

```js
data() {
  return{
    divisionTreeList: [], // 区域树数据
    divisionProps: {
      children: 'childrenList',
      label: 'name',
      value: 'id',
      expandTrigger: 'hover',
      checkStrictly: true, //来设置父子节点取消选中关联，从而达到选择任意一级选项的目的
      lazy: true, // 开启懒加载
      lazyLoad: this.loadTreeNode, // 设置加载数据源的方法
    },
  }
},
```

2.首次进入页面先调用接口展示一级数据

```js
created() {
  this.getAreaList()
},
methods: {
  async getAreaList(id = '') {
    let res = await getAreaList(id)
    this.divisionTreeList = res.data || []
  },
}
```

3.悬浮到某个节点时动态加载下一级内容（el-cascader 的加载数据源的方法）

```js
methods: {
  loadTreeNode(node, resolve){
    if(node.value){
      let nodeItem = []
      getAreaList(node.value).then(res => {
        res.data?.forEach(item => {
          nodeItem.push({
            name: item.name,
            id: item.id,
          })
        })
        resolve(nodeItem) // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      }).catch(err => {
        console.log('err---级联', err)
      })
    }
  },
}
```

4.选择多级数据再清空点开级联后，将样式还原（el-cascader 的 change 方法）

```js
methods: {
  changeCascaderDivisionIds(value) {
    if(value.length == 0){
      this.$refs.myCascader.$refs.panel.activePath = []  // 清除高亮
      this.$refs.myCascader.$refs.panel.syncActivePath()   //只展示一级节点
    }
    this.$refs.myCascader.dropDownVisible = false
  },
}
```

## 点击删除按钮弹出提示框后摁下空格/回车会执行确认删除的操作问题

<img :src="withBase('/img/vueImg/btnDel.png')" alt="图片描述">

::: tip 问题说明：
在一个列表中，点击其中一条数据后方的删除按钮后，摁下回车/空格会导致数据删除。
:::

- 1.在项目中 App.vue 文件中写入以下代码

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

## H5 判断设备型号

1. 判断是否是安卓手机

```js
const isAndroid = ran.indexOf("Android") > -1 || ran.indexOf("Linux") > -1;
```

2. 判断是否是 ios 手机

```js
const isIOS = !!ran.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
```

3. 判断是否是平板

```js
const isiPad = "ontouchstart" in window;
```

4. 判断是否是 ios 的平板

```js
const isIOSIpad = ran.indexOf("Mac") > -1 && "ontouchstart" in window;
```

5. 判断是否是微信浏览器环境

```js
 isWeixin() {
 var ua = window.navigator.userAgent.toLowerCase()
 if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
 return true
 } else {
 return false
 }
},
```

## node 多版本管理

- 管理工具使用 nvm

```js
nvm ls // 查看已安装的node

nvm use <版本号> // 切换要使用的node 版本
```

## vant 中的 Cascader 级联选择异步加载地区数据

- 使用 vant 的 Cascader 级联选择异步加载地区数据，因为全国地区数据太多，如果要一次加载出来，再显示页面会比较慢。所以通过接口点击获取当前的数据
  ::: tip 需要注意的点
  后台接口在返回数据时，如果有下一级的数据，要让后台返回 children，如果不返回，控件就会出现关闭弹框无法点击下一级的 bug（控件是根据是否有 children 来判断是否要继续点击的，前端是无法知道是否存在下一级数据的）
  :::

```js
<van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="areaShow = false" @finish="onFinish" :field-names="fieldNames" @change="onChangeArea" />
```

- 需要用到的 data 中的变量

```js
export default {
  data() {
    return {
      areaShow: false,
      cascaderValue: '',
      fieldNames: {
        text: 'name',
        value: 'id',
        children: 'children'
      },
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      divisionIds: '', // 地区的id
      divisionNames: '', // 地区的名字
    }
  },
```

1. 第一种方案：比较简单，vant 中触发本身的 change 事件，可以拿到当前点击的元素，以及它的上层元素，我们只需要把请求到的最新数据，加在最里面的数据结构中即可

```js
methods: {
    // 级联数据全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.divisionNames = selectedOptions.map(option => option.name).join('/')
      this.divisionIds = selectedOptions.map(option => option.id).join(',')
      this.areaShow = false
    },
    // 从接口请求获取第一层的数据，---比如北京
    async getAreaList() {
      let id = ''
      let res = await getAreaList(id)
      res.data.forEach(item => {
        this.options.push({
          name: item.name,
          id: item.id,
          children: item.children || null// 这个很关键
        })
      })
    },
    onChangeArea({ value, selectedOptions, tabIndex }) {
      // 需要后台接口返回children数据
      // 拿到数据后，动态添加
      getAreaList(value).then(res => {
      	// 第一种方案
        this.addTree(selectedOptions, res.data, value)
      })
    },
    addTree(selectedOptions, children, id) {
      selectedOptions.forEach(item => {
        if (item.id === id) {
          item.children = children
        } else {
          item.children = null
        }
      })
    }
  }
}
```

2. 第二种方案---递归

```js

// 级联数据全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.divisionNames = selectedOptions.map(option => option.name).join('/')
      this.divisionIds = selectedOptions.map(option => option.id).join(',')
      this.areaShow = false
    },
    // 从接口请求获取第一层的数据，---比如北京
    async getAreaList() {
      let id = ''
      let res = await getAreaList(id)
      res.data.forEach(item => {
        this.options.push({
          name: item.name,
          id: item.id,
          children: item.children || null// 这个很关键
        })
      })
    },
    onChangeArea({ value, selectedOptions, tabIndex }) {
      // 需要后台接口返回children数据
      // 拿到数据后，动态添加
      getAreaList(value).then(res => {
      	// 第三种方案
         this.addTree1(res.data, value)
      })
    },
    // 递归写法
    addTree1(list, value) {
      function addTree2(json, id) {
        const index = json.findIndex(ev => ev.id == id)
        if (index > -1) {
          if (list.length > 0) {
            json[index].children = list
          } else {
            json[index].children = null
          }
          return
        } else {
          json.map(item => {
            if (item.children) {
              addTree2(item.children || [], value)
            }
          })
        }
      }
      addTree2(this.options, value)
    }

```

- 递归的数据回显
  :::tip
  详情页面时，递归的数据需要回显，根据后端发货的回显的 id 来动态查询异步的接口
  :::

```js
    async getAreaList() {
      let id = ''
      let res = await getAreaList(id)
      res.data.forEach(item => {
        this.options.push({
          name: item.name,
          id: item.id,
          children: item.children || null
        })
      })
      if (this.arrDivisionIds.length > 1) {
        // 为了回显级联选择器
        this.fetchDataInOrder(this.arrDivisionIds)
      }
    },
    fetchData(id) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await getAreaList(id)
          this.addTree1(res.data, id)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },
    async fetchDataInOrder(ids) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        try {
          // 发起接口请求
          const data = await this.fetchData(id)
          // console.log('接口返回的数据:', data)
        } catch (error) {
          // console.error('接口请求失败:', error)
          break // 如果某个接口请求失败，停止继续请求
        }
      }
    },
```

## 密码框点击后面小眼睛图标不能跟随明文切换的问题

<img :src="withBase('/img/vueImg/passwordIcon.png')" alt="图片描述">

::: tip 问题说明：
el-input 自带的密码框切换明文显示时，图标和内容无法相对，体验感不加。
:::

1.在 data 中定义 flagNewPassword，默认值为 false

2.在 computed 中写入以下代码

```js
computed: {
  typeNewPassword() { // input类型
    return this.flagNewPassword ? 'text' : 'password'
  },
  elIconsNewPassword() { // input图标显示
    return this.flagNewPassword ? 'el-icon-view' : 'el-icon-cloce-eye'
  },
},
```

3.给图标绑定 click 事件，根据 input 类型动态显示图标

```html
<el-form-item label="新密码" prop="newPassword">
  <el-input v-model.trim="user.newPassword" :type="typeNewPassword" />
  <i
    @click="flagNewPassword = !flagNewPassword"
    :class="user.newPassword ? elIconsNewPassword : ''"
  ></i>
</el-form-item>
```

## 清空 el-form 的单独表单校验

- 方案 1

```html
<el-form ref="form">
  <el-form-item label="测试一下" prop="test"> </el-form-item>
</el-form>
```

```js
this.$refs.form.clearValidate("test"); // 清除某一个prop的校验
```

- 方案 2

```html
<el-form ref="form">
  <el-form-item label="测试一下" prop="test" ref="testRef"> </el-form-item>
</el-form>
```

```js
this.$refs.testRef.clearValidate();
```

## 表单中防止搜索框回车键刷新整个页面

- form 表单中只有一个输入框，在输入框中按下回车就是提交该表单，且会刷新页面。阻止这一默认行为，可以 在 标签上添加 @submit.native.prevent
- 搜索条件只有一个输入框时,如果使用了@keyup.enter.native=“handleQuery” 原始键盘回车事件来触发搜索操作,会对整个页面都进行刷新,想让页面不刷新,可使用 @submit.native.prevent 原始提交事件
- ‌@keyup.enter.native 的作用是监听用户在输入框中按下回车键的事件，并在事件触发时执行特定的方法或函数

```html
<el-form ref="form" @submit.native.prevent>
  <el-form-item label="测试一下" prop="test">
    <el-input v-model.trim="user.test" @keyup.enter.native="handleQuery" />
  </el-form-item>
</el-form>
```

- @submit.native.prevent
- .native 表示对一个组件绑定系统原生事件
- .prevent 表示提交以后不刷新页面
