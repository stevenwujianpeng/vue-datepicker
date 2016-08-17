import getDay from 'date-fns/get_day'
import getDate from 'date-fns/get_date'
import getDaysInMonth from 'date-fns/get_days_in_month'
// 获取某年某月的days列表
function getDays(year, month) {
  let days = []
  let date = new Date(year, month)
  let daysInMonth = getDaysInMonth(date)
  for (let i = 1; i <= daysInMonth; i++) {
    let item = {checked: false}
    item.year = year
    item.month = month
    item.day = i
    item.weekNum = getDay(new Date(year, month, i))
    days.push(item)
  }
  let firstDay = days[0]
  let first = firstDay.weekNum
  let lastDay = days[days.length - 1]
  let last = 6 - lastDay.weekNum
  for (let i = 0; i < first; i++) {
    let prev = {}
    days.unshift(prev)
  }
  for (let j = 0; j < last; j++) {
    let next = {}
    days.push(next)
  }
  return days
}
function getToday() {
  let curDate = new Date()
  let curYear = curDate.getFullYear()
  let curMonth = curDate.getMonth()
  let curDay = getDate(curDate)
  return {
    year: curYear,
    month: curMonth,
    day: curDay
  }
}
const WeeksMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
}

const MonthsMap = {
  0: '1',
  1: '2',
  2: '3',
  3: '4',
  4: '5',
  5: '6',
  6: '7',
  7: '8',
  8: '9',
  9: '10',
  10: '11',
  11: '12'
}

const HourRange = [
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23]
]
const MinuteRange = [
  [0, 5, 10, 15, 20, 25],
  [30, 35, 40, 45, 50, 55]
]

const SecondRange = [0, 15, 30, 45]

const timeMap = ['Hour', 'Minute', 'Second']

const formatMap = {
  'date': 'YYYY-MM-DD',
  'date-time': 'YYYY-MM-DD HH:mm:ss'
}

export {
  getDays,
  getToday,
  WeeksMap,
  MonthsMap,
  timeMap,
  formatMap,
  HourRange,
  MinuteRange,
  SecondRange
}
