<template>
  <div class="home-page">
    <div class="welcome">Welcome</div>
    <p>This is <span>Home Page</span></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.home-page {
  font-size: 18px;
  .welcome {
    margin: 20px;
  }
  span {
    color: @app-theme-color;
  }
}
</style>
