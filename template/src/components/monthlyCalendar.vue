<template>
  <div class='calendar-body'>
    <div class="calendar-title">
      <div
        class="calendar-week-day"
        v-for="day in weekDay"
        :key="day"
      >{{day}}</div>
    </div>
    <div class="calendar-content">
      <template v-for="day in data">
        <div
          class="calendar-date "
          :key="day.day"
          :style="day.backgroundColor"
        >{{day.day}}</div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  props: ["data"],
  data: function() {
    return {
      sd: 23,
      weekDay: ["一", "二", "三", "四", "五", "六", "七"]
    };
  }
};
</script>

<style scoped lang="stylus">
.calendar-body {
  .calendar-title {
    font-size: 27rpx;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
    text-align: center;

    .calendar-week-day {
      line-height: 58rpx;
      width: 77rpx;
      height: 58rpx;
      margin: 5rpx;
      display: inline-block;
    }
  }

  .calendar-content {
    font-size: 0;

    .calendar-date {
      background-color: #00E433;
      color: #ffffff;
      font-size: 24rpx;
      text-align: right;
      padding-right: 9rpx;
      padding-top: 5rpx;
      width: 68rpx;
      height: 54rpx;
      margin: 5rpx;
      display: inline-block;
    }
  }
}
</style>
