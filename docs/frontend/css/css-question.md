<script setup>
import { withBase } from 'vitepress'
</script>

## 全局修改Dialog对话框样式
<img :src="withBase('/img/cssImg/dialog.png')" alt="图片描述">

::: tip 修改原因：
智慧班组项目ui统一将新增/修改弹框设计成了圆角，弹框标题居中展示，因此配套的激活中心样式需和智慧班组统一。
:::
#### vue3修改：

1. 在项目src > assets > styles > element-ui.scss 文件下写入以下代码
```css
.el-dialog__header{
  text-align: center;
}
.el-dialog__footer{
  padding-bottom: 30px;
  .dialog-footer{
    display: flex;
    justify-content: center;
    .el-button{
      border-radius: 20px;
      padding: 8px 30px;
    }
    .el-button+.el-button{
      margin-left: 36px;
    }
  }
}
.dialog-footer{
  display: flex;
  justify-content: center;
  .el-button{
    border-radius: 20px;
    padding: 8px 30px;
  }
  .el-button+.el-button{
    margin-left: 36px;
  }
}
```


## 全局修改button按钮样式
<img :src="withBase('/img/cssImg/button.png')" alt="图片描述">

::: tip 修改原因：
智慧班组项目ui统一将按钮设计成了圆角，因此配套的激活中心样式需和智慧班组统一。
:::
#### vue3修改：

1. 在项目src > assets > styles > element-ui.scss 文件下写入以下代码
```css
.el-button.is-plain{
  border-radius: 20px;
}
```


## 全局修改MessageBox消息弹框样式
<img :src="withBase('/img/cssImg/mesBox.png')" alt="图片描述">

::: tip 修改原因：
智慧班组项目ui统一将MessageBox消息弹框的按钮设计成了圆角、确定在左、取消在右，因此配套的激活中心样式需和智慧班组统一。
:::
#### vue3修改：

1. 在项目src > assets > styles > element-ui.scss 文件下写入以下代码
```css
.el-message-box{
  .el-message-box__btns{
    justify-content: flex-start;
    align-items: center;
    flex-direction: row-reverse;
    .el-button{
      border-radius: 20px;
      margin-left: 10px;
    }
  }
}
```


## 页面顶部高级搜索样式调整
<img :src="withBase('/img/cssImg/search.png')" alt="图片描述">

::: tip 修改原因：
智慧班组项目中为解决列表搜索条件过多问题统一设计了高级搜索的ui样式，因此配套的激活中心样式需和智慧班组统一。
:::
#### vue3修改：

1. 在项目src > assets > styles > element-ui.scss 文件下写入以下代码
```css
.search-form-all{
  .el-form-item{
    margin-right: 10px;
    margin-bottom: 22px;
    .el-form-item__label{
      padding-right: 8px;
    }
    .el-form-item__content{
      width: 215px;
    }
  }
  .el-form-item:last-child{
    width: 146px;
    margin-right: 0;
    .el-button{
      border-radius: 20px;
      width: 68px;
      height: 30px;
    }
    .el-button+.el-button{
      margin-left: 9px;
    }
  }
  span{
    .el-form-item:last-child{
      width: 285px;
      margin-right: 13px;
      .el-form-item__label{
        padding-right: 8px;
      }
      .el-form-item__content{
        width: 215px;
      }
    }
  }
}
```

2. 在页面顶部搜索的表单中添加class类名为'search-form-all'即可
```html
<el-form class="search-form-all" :model="queryParams">
  <el-form-item label="项目名称" prop="projectName">
    <el-input v-model.trim="queryParams.projectName" placeholder="请输入项目名称" maxlength="20" clearable @keyup.enter="handleQuery" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
  </el-form-item>
</el-form>
```

## 全局强改颜色样式
<img :src="withBase('/img/cssImg/color.png')" alt="图片描述">

::: tip 修改原因：
智慧班组项目有时会出现颜色加载失败的问题，为解决此问题，决定强制修改element ui的颜色。
:::
#### vue2修改：

1.在项目src > assets > styles > element-ui.scss 文件下写入以下代码
```css
/*  */
.el-button.btn_addAll{
  color: #ff5500 !important;
}
.el-switch.is-checked .el-switch__core{
  border-color: #ff5500 !important;
  background-color: #ff5500 !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #ff5500 !important;
}
.cell .el-tag{
  background-color: #ffeee6;
  border-color: #ffddcc;
  color: #ff5500;
}
```