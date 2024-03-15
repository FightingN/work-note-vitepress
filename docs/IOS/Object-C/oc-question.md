
## NSString常用方法
1.字符串分割成数组<br>
```objective-c
 NSArray *array = [string componentsSeparatedByString:@","];
 ```

2.字符串拼接<br>
```objective-c
NSString *string = [array componentsJoinedByString:@","];
```

3.字符串筛选
```objective-c
NSString *regularExpStr = @""; //正则表达式
NSRegularExpression *regularExp = [[NSRegularExpression alloc] initWithPattern:regularExpStr options:NSRegularExpressionCaseInsensitive error:nil];
[regularExp enumerateMatchesInString:string options:NSMatchingReportProgress range:NSMakeRange(0, string.length) usingBlock:^(NSTextCheckingResult * _Nullable result, NSMatchingFlags flags, BOOL * _Nonnull stop) {
    *stop = YES; //停止剩余所有循序
    return; //停止当前循环
}];
```


##  NSArray常用方法
1.数组中含有某个对象
```objective-c
BOOL ret = [array containsObject:@"string"];
```

2.数组遍历
```objective-c
[array enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    *stop = YES; //停止剩余所有循序
    return; //停止当前循环
}];
```



## UI控件常见问题处理
1.View部分角设置圆角
```objective-c
UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:view.bounds byRoundingCorners:UIRectCornerTopRight | UIRectCornerBottomLeft cornerRadii:CGSizeMake(5, 5)];
CAShapeLayer *shapeLayer = [[CAShapeLayer alloc] init];
shapeLayer.path = path.CGPath;
view.layer.mask = shapeLayer;
```







