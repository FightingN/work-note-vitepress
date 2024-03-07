## 字典值回显

#### vue2 写法：

1. 在项目中的公共方法文件中写入以下代码

```js
/**
 *@param dict 字典名称
 *@param label 需要转换的字段名
 */
export function getDictLabel(dict, label) {
  const item = dict.find((value) => {
    return label == value.value;
  });
  return item?.label;
}
```

2. 在需要的页面中引入后，传入字典值和需要转换的字段名即可

```js
let value = getDictLabel(this.dict.type.字典名, 要转换的字段名);
```

#### vue3 写法：

1. 在项目中的公共方法文件中写入以下代码

```js
/**
 *@param dict 字典名称
 *@param label 需要转换的字段名
 */
export function getDictLabel(dict, label) {
  const item = dict.value.find((value) => {
    return label == value.value;
  });
  return item?.label;
}
```

2. 在需要的页面中引入后，传入字典值和需要转换的字段名即可

```js
let value = getDictLabel(字典名, 要转换的字段名);
```

## 数组对象去重(单个 key)

### 方案 1

- vue2 写法：

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
  { id: 1, name: "John" },
  { id: 2, name: "Mary" },
  { id: 1, name: "John" },
];
let uniqueArrayByKey = uniqueArrayObjectsByKey(array, "id");
// console.log(uniqueArrayByKey)
// [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Mary' }
// ]
```

### 方案 2

```js
/**
去除数组中对象属性的重复值
@param arrObj 原数组
@param key 属性的key
@param 返回值为一个新数组
 */
export function arrayObjReduce(arrObj, key) {
  let newArrObj = [];
  newArrObj = arrObj.filter(
    (item, index, origin) =>
      index ===
      origin.findIndex((itemInner) => {
        return itemInner[key] === item[key];
      })
  );
  return newArrObj;
}
```

- 使用

```js
let arrObj = [
  {
    name: "xiaoqing",
    age: 15,
    sex: 0,
  },
  {
    name: "xiaoming",
    age: 12,
    sex: 0,
  },
  {
    name: "xiaobai",
    age: 21,
    sex: 0,
  },
  {
    name: "xiaoqing",
    age: 25,
    sex: 0,
  },
];
//引入该方法后
const newArrObj = arrayObjReduce(arrObj, "name");
console.log("----", newArrObj);
```

## 数组对象去重(多个 key)

#### vue2 写法：

1. 在项目中的公共方法文件中写入以下代码

```js
/**
 *@param array 要去重的数组
 *@param keys 要去重的具体key值
 */
export function uniqueArrayObjectsByKey(array, ...keys) {
  const uniqueArray = array.reduce((unique, item) => {
    // 根据传入的多个 key 值判断是否为重复项
    const hasDuplicate = unique.some((u) =>
      keys.every((key) => u[key] === item[key])
    );
    // 如果不是重复项，则将其添加到新数组中
    if (!hasDuplicate) {
      unique.push(item);
    }
    return unique;
  }, []);

  return uniqueArray;
}
```

2. 在需要的页面中引入后，传入相关值即可

```js
let array = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Jane", age: 25 },
  { id: 1, name: "John", age: 30 },
  { id: 3, name: "Jane", age: 25 },
];
let keysToCheck = ["id", "name"];
let uniqueArrayByKey = uniqueArrayObjectsByKey(array, ...keysToCheck);
// console.log(uniqueArrayByKey)
// [
//   { id: 1, name: 'John', age: 20 },
//   { id: 2, name: 'Jane', age: 25 },
//   { id: 3, name: 'Jane', age: 25 }
// ]
```

## 数组中按照对象的某个属性值排序

```js
/**
数组中按照对象的某个属性值排序
@param arrObj 原数组
@param key 属性的key
@param sort  -1升序 1降序
@param 返回值为一个新数组
 */
export function arraySort(arrObj, key, sort) {
  return arrObj.sort((a, b) => (a[key] <= b[key] ? sort : -sort));
}
```

- 使用

```js
let a = [
  { name: "张三", age: 109 },
  { name: "李四", age: 189 },
  { name: "王五", age: 19 },
  { name: "哈哈", age: 1 },
  { name: "赵六", age: 197 },
];
console.log(arraySort(a, "age", -1));
```

## 数字过渡动画

```js
/**
 * 数字过渡动画-目前版本-默认一秒之内完成过渡动画
 * @param current number 当前值
 * @param target number 目标值
 * @param _this 传递 当前实例指向 this
 * @param property string _this 和 property 是因为要把需要改变的属性传递进去，因为函数传参基础数据类型是值拷贝而不是值引用
 * @param step number 当前版本支持 1 0.1 0.01 分别对应 整数变化、一位小数、两位小数
 */

export function numAnimation(
  current,
  target,
  _this,
  property,
  step = 1,
  totalTime = 1000,
  duration = 20,
  timer = ""
) {
  clearInterval(timer);
  let ternialStep = 0;
  if (target >= current) {
    ternialStep = (target - current) / (totalTime / duration);
  } else {
    ternialStep = (current - target) / (totalTime / duration);
  }

  if (ternialStep > 10) {
    ternialStep = parseInt(ternialStep).toString().split("");
    ternialStep[ternialStep.length - 1] = 1;
    ternialStep = parseInt(ternialStep.join(""));
  } else {
    ternialStep = Math.ceil(ternialStep) || 1;
  }
  if (current < target) {
    timer = setInterval(() => {
      if (step === 0.1) {
        _this[property] =
          (_this[property] * 1000 + (step + ternialStep) * 1000) / 1000;
      } else if (step === 0.01) {
        _this[property] =
          (_this[property] * 1000 + (step + ternialStep) * 1000) / 1000;
      } else {
        _this[property] = _this[property] + ternialStep;
      }
      if (_this[property] >= target) {
        _this[property] = target;
        clearInterval(timer);
      }
    }, duration);
  } else if (current > target) {
    timer = setInterval(() => {
      if (step === 0.1) {
        _this[property] =
          (_this[property] * 1000 - (step + ternialStep) * 1000) / 1000;
      } else if (step === 0.01) {
        _this[property] =
          (_this[property] * 1000 - (step + ternialStep) * 1000) / 1000;
      } else {
        _this[property] = _this[property] - ternialStep;
      }
      if (_this[property] <= target) {
        _this[property] = target;
        clearInterval(timer);
      }
    }, duration);
  }
}
```

- 使用

```js
<div class="user-number">{{ totalUser }}</div>
  data() {
    return {
      totalUser: 0,
    }
  },
  numAnimation(this.totalUser, res.data.userTotalCount || 0, this, 'totalUser')
```

- 数组中使用

```js
  data() {
    return {
        zommDataList: [
        { name: '总数', value: 0 },
        { name: '占用', value: 0 },
      ],
    }
  },
  numAnimation(this.zommDataList[0].value, res.data.total || 0, this.zommDataList[0], 'value')
  numAnimation(this.zommDataList[1].value, res.data.used || 0, this.zommDataList[1], 'value')
```

## 实现数字千位分隔符格式(8888,显示为 8,888),

```js
/* 数字金额逢三加， 比如 123,464.23 */
export const numberFilter = function (value, cut = 2) {
  //value为我们传进来的数据 比如  145775.422346
  //cut 为需要保留的小数位数  -1为清空小数 0为保留全部位数的小数 传入多少即为多少 不传默认保留两位小数 传进来多少就截取多少
  //数据校验
  if (parseFloat(value).toString() == "NaN") return "0.00";
  // 将数值截取
  let num = value.toString().split(".");
  let zs = num[0];
  let xs = num[1];
  // 整数部分处理，增加,
  const intPartFormat = zs.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  if (xs != null) {
    if (cut == 0) {
      return intPartFormat + "." + xs;
    } else if (cut == -1) {
      return intPartFormat;
    } else {
      return intPartFormat + "." + xs.substr(0, cut);
    }
  } else {
    return intPartFormat;
  }
};
```

- 使用注册为过滤器

```js
  <div class="user-number">{{ totalUser | numberFilter }}</div>
  data() {
    return {
      totalUser: 0,
    }
  },
  filters: {
    numberFilter,
  },
```

## 取 2 个数组的不同项

```js
/**
 * 取2个数组的不同项,前提是value2数组的项，在value1中都有，取出value1比value2多的项
 * @param value1 长数组
 * @param value1 短数组
 */
export function removeRepetition(value1, value2) {
  let repetitionList = value1.filter((item) => {
    let repetition = value2.some((value) => {
      return item.id === value.id;
    });
    if (!repetition) {
      return item;
    }
  });
  return repetitionList;
}
```
