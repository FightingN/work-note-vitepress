## some
定义：用于监测数组中的元素是否满足指定条件，方法会依次执行数组的每一个元素，如果有一个元素满足条件，表达式返回true，剩余的元素不会再执行监测，如果没有满足条件的元素，则返回false。

注：不会对空数组检测。
```javascript
let tag = arr.some((item, index) => {
	return item.id !== arr2[index].id
})
```

## every
定义：用于检测数组所有元素是否都符合指定条件，如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测；如果所有元素都满足条件，则返回 true。

注：对空数组检测返回true。
```javascript
const arr = [1, 2, 3, 4, 5, 6];
const result = arr.every(x => { // 结果是false,因为存在比3小的数
	return x > 3
});
```

## find
定义：用于查找出当前数组中第一个符合筛选条件的元素(不是下标)，若当前数组中有符合筛选条件的元素，则返回第一个符合筛选条件的元素，若没有符合条件的元素，则返回Undefined。
```javascript
let arr = [10,20,30,40,50];    
//查找大于20的元素  返回30
var result = arr.find(function(item,index,arr){
	return item > 20;
}); 

//查找大于100的元素 返回undefined
var result = arr.find(function(item,index,arr){
	return item > 100;
});
```

## findIndex
定义：返回数组中符合筛选条件的第一个元素的索引，若当前数组中有符合筛选条件的元素，则返回第一个符合筛选条件的元素的索引，若没有符合条件的元素，则返回-1。
```javascript
// 获取数组中第一个值等于或大于 18 的元素的索引：
var ages = [3, 10, 18, 20];
// 输出2
var result = arr.find(function(item,index){
	return item >= 18;
});
```

## filter
定义：创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。用于把Array中的某些元素过滤掉，然后返回剩下的未被过滤掉的元素。
```javascript
const array = [14, 17, 18, 32, 33, 16, 40];

const newArr = array.filter(num => num > 14)
console.log(newArr);//打印 [17,18,32,33,16,40]
```

## reduce
定义： 让数组的前后两项进行某种计算。然后返回其值，并继续计算。不改变原数组，返回计算的最终结果，从数组的第二项开始遍历。
```javascript
var arr = [1,2,3,4];
arr.reduce((result,item,index,arr) => {
    console.log(result) // 1  3  6  result为上次一计算的结果
    console.log(item)  // 2  3  4
    console.log(index) // 1  2  3
    return result+item //最终结果为10
})
```

