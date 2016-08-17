# vue components - datepicker

## start
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## feature
 1. 支持两种类型的时间选择- 日期选择 & 日期时间选择
## usage

```javascript
// 只选择日期
<date-picker :val.sync="curDate" type="date"></date-picker>

// 可以选择日期和时间
<date-picker :val.sync="curDate" type="date-time"></date-picker>
```
## API

|  选项   |   类型    | 默认值    | 说明 |
| :----  |  :----   | :----    | :----|
|   val   |   String  | ' ' (空)  | 同步更新组件父子组件间时间的值|
| type    | String    |  'date'   | 'date' => 输出YYYY-MM-DD格式的日期时间  <br>   'date-time' => 输出YYYY-MM-DD HH:mm:ss的日期时间|
## 如何引入到你的项目中


## 组件使用截图
'date' =>


