<template>
  <div id="app">
    <form @submit.prevent="">
      <div class="form-group">
        <date-picker :val.sync="curDate" type="date"></date-picker>
      </div>
    </form>

  </div>
</template>

<script>
  import DatePicker from './components/date-picker/date-picker.vue'

  export default {
    components: {
      'date-picker': DatePicker
    },
    data () {
      return {
        curDate: ''
      }
    }
  }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    margin: 100px;
    width: 300px;
  }
</style>
