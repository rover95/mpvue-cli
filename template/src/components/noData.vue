<template>
  <div
    style="text-align:center;font-size:15px;color:#000000;"
    :style="show?'display:block;opacity:.4':'display:none'"
  >暂无数据</div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      //key:value
    };
  }
};
</script>

<style scoped lang="stylus">
</style>
