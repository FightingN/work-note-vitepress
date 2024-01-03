## 字典值回显
```js
// vue2写法
export function getDictLabel(dict, label) {
  const item = dict.find((value) => {
    return label == value.value
  })
  return item?.label
}

// vue3写法
export function getDictLabel(dict, label) {
  const item = dict.value.find((value) => {
    return label == value.value
  })
  return item?.label
}
```