<template>
  <div class="date-picker" @click="datePickClick">
    <input type="text" class="form-control date-picker-input"
           @focus="select()"
           v-model="val"
    >
    <div class="date-picker-container" v-show="show">
      <div class="header clearfix">
        <span class="header-title">{{year}}年{{realMonth}}月</span>
        <span class="prevYear icon icon-double-prev" @click="year--"></span>
        <span class="prevMonth icon icon-prev" @click="prevMonth()"></span>
        <span class="nextYear icon icon-double-next" @click="year++"></span>
        <span class="nextMonth icon icon-next" @click="nextMonth()"></span>
      </div>
      <div class="days">
        <ul class="days-header clearfix">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <ul class="days-body clearfix">
          <li v-for="item in days"
              :class="{'empty': !item.day, 'active': item.checked}"
              @click="selectDay(item)"
              track-by="$index">
            {{item.day}}
          </li>
        </ul>
      </div>
      <!-- 时间选择器 -->
      <div v-if="type === 'date-time'" class="time-container">
        <hr>
        <table class="time">
          <tbody>
          <tr>
            <td class="hour">
              <input type="text"
                     v-model="hour"
                     class="hour-input"
                     @click="selectTime($event,'Hour')"
              >
              <table class="hour-container" v-show="showSelectHour">
                <tbody>
                <tr v-for="item in HourRange">
                  <td v-for="i in item"
                      :class="{'active': i == hour}"
                      @click="selectQuick('hour', i)"
                  >{{i}}
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
            <td>:</td>
            <td class="minute">
              <input type="text"
                     v-model="minute"
                     class="minute-input"
                     @click="selectTime($event,'Minute')"
              >
              <table class="minute-container" v-if="showSelectMinute">
                <tbody>
                <tr v-for="item in MinuteRange" track-by="$index">
                  <td v-for="i in item"
                      track-by="$index"
                      :class="{'active': i == minute}"
                      @click="selectQuick('minute', i)"
                  >{{i}}
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
            <td>:</td>
            <td class="second">
              <input type="text"
                     v-model="second"
                     class="second-input"
                     @click="selectTime($event,'Second')"
              >
              <table class="second-container" v-show="showSelectSecond">
                <tbody>
                <tr>
                  <td v-for="i in SecondRange"
                      track-by="$index"
                      :class="{'active': i == second}"
                      @click="selectQuick('second', i)"
                  >{{i}}
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
            <td></td>
            <td>
              <button class="btn btn-primary" @click="selectDayTime">确定</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {
    getDays,
    getToday,
    MonthsMap,
    HourRange,
    MinuteRange,
    SecondRange,
    timeMap,
    formatMap
  } from './date-utils'
  import parse from 'date-fns/parse'
  import format from 'date-fns/format'
  export default {
    props: {
      val: {
        type: String,
        twoWay: false
      },
      type: {
        type: String
      }
    },
    data () {
      return {
        year: 0,
        month: 0,
        day: 0,
        hour: 12,
        minute: 0,
        checked: {
          year: null,
          month: null,
          day: null
        },
        second: 0,
        days: [],
        show: false,
        showSelectHour: false,
        showSelectMinute: false,
        showSelectSecond: false,
        HourRange: HourRange,
        MinuteRange: MinuteRange,
        SecondRange: SecondRange
      }
    },
    computed: {
      realMonth () {
        return MonthsMap[this.month]
      }
    },
    ready () {
      let today
      if (this.val) {
        today = parse(this.val)
      } else {
        today = getToday()
      }
      this.checked.year = this.year = today.year
      this.checked.month = this.month = today.month
      this.checked.day = this.day = today.day
      this.$watch('year', () => {
        this.renderDays()
      })
      this.$watch('month', () => {
        this.renderDays()
      })
      this.renderDays()
      document.addEventListener('click', this.bodyClick, false)
    },
    methods: {
      select () {
        this.show = true
      },
      close () {
        this.show = false
      },
      prevMonth () {
        if (this.month === 0) {
          this.month = 11
          this.year--
        } else {
          this.month--
        }
      },
      nextMonth () {
        if (this.month === 11) {
          this.month = 0
          this.year++
        } else {
          this.month++
        }
      },
      selectDay (item) {
        this.days.forEach((day) => {
          day.checked = false
        })
        item.checked = true
        this.checked = {
          year: this.year,
          month: this.month,
          day: item.day
        }
        if (this.type === 'date') {
          this.val = format(new Date(this.checked.year, this.checked.month, this.checked.day), formatMap[this.type])
          this.show = false
        }
      },
      selectDayTime () {
        this.val = format(new Date(this.checked.year, this.checked.month, this.checked.day, this.hour, this.minute, this.second), formatMap[this.type])
        this.show = false
      },
      selectTime (ev, type) {
        ev.srcElement.select()
        this.hideQuickSelect()
        this[`showSelect${type}`] = true
        ev.stopPropagation()
      },
      selectQuick (type, value) {
        this[type] = value
      },
      bodyClick (ev) {
        let targetDom = ev.currentTarget
        if (targetDom.querySelector('.date-picker')) {
          this.show = false
        }
      },
      datePickClick (ev) {
        if (this.type === 'date-time') {
          this.hideQuickSelect()
        }
        ev.stopPropagation()
      },
      hideQuickSelect () {
        timeMap.some((time) => {
          if (this[`showSelect${time}`]) {
            this[`showSelect${time}`] = false
            return true
          }
        })
      },
      renderDays () {
        this.days = getDays(this.year, this.month, this.day)
        this.days.some((item) => {
          if (item.year === this.checked.year && item.month === this.checked.month && item.day === this.checked.day) {
            item.checked = true
            return true
          }
        })
      }
    },
    beforeDestroy () {
      document.removeEventListener('click', this.bodyClick, false)
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .date-picker {
    display: inline-block;
    position: relative;
    &-container {
      background: #fff;
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 51;
      width: 222px;
      padding: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
    .header {
      text-align: center;
      &-title {
        line-height: 30px;
      }
      .prevMonth, .nextMonth, .prevYear, .nextYear {
        float: left;
        width: 20px;
        height: 25px;
        line-height: 25px;
        border-radius: 4px;
        margin: 2px;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          background: #eeeeee;
        }
      }
      .nextMonth, .nextYear {
        float: right;
      }
    }
    .days {
      &-header {
        padding: 0;
        margin: 0;
        li {
          float: left;
          width: 30px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          border-radius: 4px;
          cursor: default;
        }
      }
      &-body {
        padding: 0;
        margin: 0;
        li {
          float: left;
          width: 30px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          &.empty {
            visibility: hidden;
          }
          &:not(.empty):hover {
            background: #ddd;
          }
          &:not(.empty).active {
            background: #2980B9;
            color: #fff;
          }
        }
      }
    }
    hr {
      margin: 0 0 10px 0;
    }
    .time-container {
      padding: 0 0 7px 0;
    }
    .time {
      width: 100%;
      tr {
        td {
          position: relative;
          padding: 0 4px;
          > input {
            width: 32px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          }
          > .btn {
            width: 32px;
            height: 25px;
            padding: 0;
            line-height: 25px;
            text-align: center;
            font-size: 12px;
          }
          .hour, .minute, .second {
            &-container {
              padding: 2px;
              position: absolute;
              left: 4px;
              top: 100%;
              z-index: 52;
              background: #fff;
              border-radius: 4px;
              border: 1px solid #ccc;
              transform: translateY(2px);
              td {
                text-align: center;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                  background: #ddd;
                }
                &.active {
                  background: #2980B9;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
