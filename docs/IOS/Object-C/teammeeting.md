<script setup>
import { withBase } from 'vitepress'
</script>

# 智慧班组 3.0


## 一、会议事项相关改动
```objective-c
"会议详情"  //常显
"字幕"     //"app:meeting:groupFill" && meetingStatus=2 && captionFlag=1
"事项统计"  //"app:meeting:matterStat" && meetingStatus>0
```

#### 1.会议详情-会议事项
① 领料
```objective-c
//新增领料申请
"/meeting/stMeetingHis/app/pickApply"
参数名: "meetingId"
       "pickApplyDetail"  //list的json串吧,跟之前归档提交一样
       
//领料详情  
"/meeting/apply/app"
参数名: "meetingId"        //接口参数由领料单id变更为会议id
```
② 生命体征
```objective-c
//填写和查看填写结果都调用h5页面

//填写生命体征
域名+"/signsCollection?userType=app&token=XXXX&meetingId=XXXX"
//查看填写结果
域名+"/signsCollection?userType=app&token=XXXX&meetingId=XXXX&finished=1"

//需要注入'setExamState'方法接收前端回调退出h5页面
```

#### 2.事项统计-会议事项
① 签到
```objective-c
//签到结果查询
"/meeting/stMeetingHis/signList"
参数名:"meetingId"
```
② 领料
```objective-c
"finished"=0   //提示错误"未完成无法查看详情"
"finished"=1   //领料详情 上边有
```

③ 每日一题
```objective-c
"finished"=0   //提示错误"未完成无法查看详情"

"finished"=1
//查看每日一题内容
域名+"/matterQuestionInfo?userType=app&token=XXXX&meetingId=XXXX"
```

④ 生命体征
```objective-c
"subCount"=0   //提示错误"暂无提交信息"
        
"subCount">0   //生命体征已填写的信息列表
"/meeting/stMeetingUserHealth/query"
参数名: @"meetingId":_meetingId,
       @"flag":@"1"//0查个人 1查全部人
```
<img :src="withBase('/img/iosImg/healthlist.jpg')" alt="图片描述">