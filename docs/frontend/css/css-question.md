## 全局修改element弹框样式
```css
/* vue3 全局修改element弹框样式 */
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

## 页面头部搜索样式调整
```css
/* vue3 页面头部搜索样式调整 */
/* 在页面头部搜索的表单中添加class类名为'search-form-all'即可 */
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

## 全局强改颜色样式
```css
/* vue2 颜色强制修改 */
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