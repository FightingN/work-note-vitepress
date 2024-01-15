## 字典值回显
```js
// vue2写法

// 1.在项目中src > utils > common.js 文件中下入以下代码
export function getDictLabel(dict, label) {
  const item = dict.find((value) => {
    return label == value.value
  })
  return item?.label
}

// 2.在要使用的页面中引入该方法
import { getDictLabel } from '@/utils/common.js'

// 3.传入字典值和需要转换的字段名即可
let value = getDictLabel(this.dict.type.字典名, 要转换的字段名)
```

```js
// vue3写法

// 1.在项目中src > utils > common.js 文件中下入以下代码
export function getDictLabel(dict, label) {
  const item = dict.value.find((value) => {
    return label == value.value
  })
  return item?.label
}

// 2.在要使用的页面中引入该方法
import { getDictLabel } from "@/utils/common.js";

// 3.传入字典值和需要转换的字段名即可
let value = getDictLabel(字典名, 要转换的字段名);
```

## 数组对象去重
```javascript
// vue2写法

// 1.在项目中src > utils > common.js 文件中下入以下代码
export function cutarray(arr) {
  let obj = {};
  let newArr = [];
  arr.forEach((item) => {
    if (obj[item.id] == undefined) {
      obj[item.id] = 1;
      newArr.push(item);
    } else {
      obj[item.id] += 1;
    }
  });
  return newArr;
},

// 2.在要使用的页面中引入该方法
import { cutarray } from '@/utils/common.js'

// 3.传入要去重的数组对象即可
let list = [{ id: 1, val:'111' }, { id: 1, val:'222'}]
list = cutarray(list)
```

## 删除数组中某些不符合条件的元素
```javascript
// vue2写法

// 1.在项目中src > utils > common.js 文件中下入以下代码
removeArrItems(arr){
  for(let i = 0; i < this.arr.length; i++){
    if(this.arr[i].stu !== 1){
      this.arr.splice(i, 1)
      i--
    }
  }
  return arr
}

// 2.在要使用的页面中引入该方法
import { removeArrItems } from '@/utils/common.js'

// 3.传入对应数组即可
let list = [{ id: 1, stu: 1 }, { id: 1, stu: 0}]
list = removeArrItems(list)
```