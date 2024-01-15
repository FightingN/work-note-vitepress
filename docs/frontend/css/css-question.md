## 全局修改element弹框默认的样式
```css
/* vue3修改：在项目src > assets > styles > element-ui.scss 文件下写入以下代码 */

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

.el-button.is-plain{
  border-radius: 20px;
}

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
```css
/* vue3修改：*/
/* 1.在项目src > assets > styles > element-ui.scss 文件下写入以下代码 */
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
```html
<!-- 2.在页面顶部搜索的表单中添加class类名为'search-form-all'即可 -->
<el-form :model="queryParams" class="search-form-all" ref="queryRef" :inline="true" label-width="70px">
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
```css
/* vue2修改：在项目src > assets > styles > element-ui.scss 文件下写入以下代码 */
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