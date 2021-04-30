<template>
  <div class="about-page">
    <div class="welcome">Welcome</div>
    <p>This is <span>About Page</span></p>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.about-page {
  font-size: 18px;
  .welcome {
    margin: 20px;
  }
  span {
    color: @app-theme-color;
  }
}
</style>
