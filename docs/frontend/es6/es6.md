## 变量和常量关键词

### let 关键词

- let 用来声明变量
- 没有变量提升
- 有块级作用域(一对大括号就是一个程序块，在大括号之中声明的变量，出了大括号就不能用了)
- 不能重复声明变量

### const 常量

- 一旦赋值就不能改变的量就是常量
- 特点：

  - 没有常量提升
  - 也有块级作用域
  - 必须要初始化值

### var、let 和 const 的区别

- var 和 let 都能声明变量，但是 let 更严谨一些，在 es6 之后都推荐使用 let 来声明变量。
- let 的特殊点： 不能提升变量(保证程序的逻辑通畅)、 有块级作用域(避免变量交叉污染)、不能重复声明保证变量的唯一性
- const 用来声明常量，常量是不能改变的量，常量也有块级作用域，不能提升，初始化常量时必须赋值
- 能用 const 就用 const

## 解构赋值

- 解构赋值就是将对象或者数组中的数据拆解出来分别赋值给某几个变量/常量

### 对象解构

- 注意: 解构的变量名必须是对象的 key

```js
注意: 解构的变量名必须是对象的key;
```

### 数组解构

```js
const [a, b, c] = ["张飞", "李逵", "李鬼"];
```

### 别名

```js
const { name: username, age } = { name: "zs", age: 20 };
console.log(username);
console.log(name); //一旦使用了别名，原名就无法使用了
```

### 变量数量和单元值数量不对等

- 当变量数少于单元值数量时，按顺序赋值
- 当变量数多于单元值数量时，没有对应的变量为 undefined

## 扩展运算符

- 如果使用 ... 则多余出来的值会以数组形式保存在最后一个变量中

```js
let [a, b, ...c] = ["aaa", "bbb", "ccc", "ddd", "eee"];
```

- 'ccc', 'ddd', 'eee' 会以数组形式保存在变量 c 中

## 模板字符串

- 使用反引号来声明的字符串就是模板字符串 （Esc 下面的键）
- 使用反引号定义字符串时，字符串中可以忽略单双引号的嵌套问题
- 在模板字符串中要输出变量可以使用 \${变量名} 的形式
- 也不用担心换行问题

## 字符串扩展函数

- includes()

```js
includes() 判断一个字符串是否包含另一个字符串
str.includes(char): 判断char是否在str中，存在则返回true，不存在则返回false
```

- startsWith() 和 endsWith()

  - startsWith(): 判断一个字符串是否以另一个字符串开始
  - endsWith(): 判断一个字符串是否以另一个字符串结束

```js
str.startsWith(char): 判断str是否以char开头，是则返回true，否返回false
str.endsWith(char): 判断str是否以char结尾，是则返回true，否返回false
```

- padStart() 和 padEnd()

  - padStart(): 设置字符串总长度，如果长度不够则使用某个字符填充到字符串的开头
  - padEnd(): 设置字符串总长度，如果长度不够则使用某个字符填充到字符串的结尾

```js
let str = "ab";
//使用 - 将字符串str填充成7位，从字符串开头进行填充
console.log(str.padStart(7, "-")); //-----ab

//使用 - 将字符串str填充成7位，从字符串结尾进行填充
console.log(str.padEnd(7, "-")); //-----ab
```

## 数组扩展函数

- includes：判断一个数组中是否包含另一个值
  - arr.inclcudes(val): 判断 arr 数组中是否包含 val 值，如果包含返回 true，否则返回 false

```js
const arr = ["aaa", 123, 3.1415, 666];
console.log(arr.includes(666)); //true
console.log(arr.includes("666")); //false
```

## 箭头函数

- 箭头函数的用法和普通函数用法几乎一致
- 去掉 function 关键词
- () 和 {} 之间增加 =>

```js
function () {}  //声明一个匿名函数
() => {}        //箭头函数

let show = function () {}
let show = () => {}
```

箭头函数的特殊点

- 箭头函数不能作为构造函数
- 箭头函数没有 arguments，要使用可变参数可以使用 rest 方式
- 箭头函数没有 this 对象，在箭头函数中的 this 指的函数外层的对象
- 如果函数体只有一句并且设置了返回值，则不需要使用大括号，不需要 return
- 如果函数中只有一个参数，则不需要写小括号

## 定义对象的简洁方式

- 在声明对象时，值的变量名和属性名相同时, 可以只写属性而不写值

## Null 判断运算符(空值合并运算符)??

[参考链接](https://juejin.cn/post/7064462293655879693)

- 当左侧的操作数为 null 或者 undefined 时， 返回右侧操作数， 否则返回左侧操作数。
- **只有在？？前面的数字为 null、undefined 的时候才会返回后面的数字;
  ||或运算符，不仅包含 null、undefined，还包含 0、''、false**
- **左侧操作符是 null**

```js
const data = null;
const str = data ?? "我是一个空值";
console.log(str); //我是一个空值
```

- **左侧操作符是 undefined**

```js
const data = undefined;
const str = data ?? "我是一个空值";
console.log(str); //我是一个空值
```

- **左侧操作符是其他**

```js
const data = "哈哈";
const str = data ?? "我是一个空值";
console.log(str); //哈哈
```

```js
a||'哈哈'
let a = null、undefined、0、''、false都会返回  哈哈
```

## 逻辑赋值运算符 ??=

- x??=y 仅在 x 是 null 或者 undefined 时对其赋值。

```js
const p = {
  name: "Iric",
};
p.name ??= "张三";
console.log(p.name); //Iric
p.age ??= 23;
console.log(p.age); //23
```

- 逻辑空赋值的语法短路也意味着 x ??= y 等价于：x ?? (x = y);

## 链判断运算符 ?.

- 表达式中的所有引用不存在也不会报错，只返回 undefined

```js
const p = {
  name: "Iric",
  friends: {
    name: "Lisa",
  },
};
const name = p.friends?.name;
console.log(name); //Lisa
const age = p.friends?.age;
console.log(age) / undefined;
```

#### 链判断运算符?.有三种写法。

- obj?.prop // 对象属性是否存在
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法是否存在

```js
a?.b; // 等同于
a == null ? undefined : a.b;

a?.[x]; // 等同于
a == null ? undefined : a[x];

a?.b(); // 等同于
a == null ? undefined : a.b();

a?.(); // 等同于
a == null ? undefined : a();
```

- (1)短路机制
  - 本质上，?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。

```js
a?.[++x];
// 等同于
a == null ? undefined : a[++x];
```

- 上面的代码， 如果 a 是 undefined 或者 null, 那么 x 就不会递增运算， 也就是说， 链判断运算符一旦为真， 右侧的表达式就不会在求值。
- （2）括号的影响
  - 如果属性链有圆括号， 连判断运算符对圆括号外部没有影响， 只对圆括号内部有影响。

```js
(a?.b).c(
  //等价于
  a == null ? undefined : a.b
).c;
```

- 上面代码中， ?.对圆括号外部没有影响， 不管 a 对象是否存在， 圆括号后面的.c 总是会执行。一般来说， 使用?.运算符的场合， 不应该使用圆括号


## 对象的新增方法
### Object.is()
- 用于确定两个值是否相同