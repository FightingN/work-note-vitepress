## 字典值回显
#### vue2写法：
1. 在项目中的公共方法文件中写入以下代码
```js
/**
*@param dict 字典名称
*@param label 需要转换的字段名
*/
export function getDictLabel(dict, label) {
  const item = dict.find((value) => {
    return label == value.value
  })
  return item?.label
}
```
2. 在需要的页面中引入后，传入字典值和需要转换的字段名即可
```js
let value = getDictLabel(this.dict.type.字典名, 要转换的字段名)
```

#### vue3写法：
1. 在项目中的公共方法文件中写入以下代码
```js
/**
*@param dict 字典名称
*@param label 需要转换的字段名
*/
export function getDictLabel(dict, label) {
  const item = dict.value.find((value) => {
    return label == value.value
  })
  return item?.label
}
```
2. 在需要的页面中引入后，传入字典值和需要转换的字段名即可
```js
let value = getDictLabel(字典名, 要转换的字段名);
```

## 数组对象去重
#### vue2写法：
1. 在项目中的公共方法文件中写入以下代码
```js
/**
*@param array 要去重的数组
*@param key 要去重的具体key值
*/
export function uniqueArrayObjectsByKey(array, key) {
  const uniqueKeys = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (!uniqueKeys.has(keyValue)) {
      uniqueKeys.add(keyValue);
      return true;
    }
    return false;
  });
}
```
2. 在需要的页面中引入后，传入相关值即可
```js
let array = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mary' },
  { id: 1, name: 'John' }
];
let uniqueArrayByKey = uniqueArrayObjectsByKey(array, 'id');
// console.log(uniqueArrayByKey)
// [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Mary' }
// ]
```