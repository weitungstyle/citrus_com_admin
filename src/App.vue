<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    console.log(process.env.VUE_APP_APIPATH);
  }
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>