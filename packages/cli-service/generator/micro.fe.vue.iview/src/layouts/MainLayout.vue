<template>
  <div class="vueapp-main-layout">
    <div class="vueapp-side">
      <div class="vueapp-logo">Vue App Logo</div>
      <div class="vueapp-menu">
        <router-link to="/">Home Page</router-link>
        <router-link to="/about">About Page</router-link>
      </div>
    </div>
    <div class="vueapp-wrapper">
      <header class="vueapp-header">
        <div class="vueapp-header-title">Rendered by Vue</div>
      </header>
      <div class="vueapp-container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.vueapp-main-layout {
  display: flex;
  height: 100%;
  .vueapp-side {
    width: 280px;
    background-color: #eee;
  }
  .vueapp-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .vueapp-header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }
  .vueapp-container {
    flex: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .vueapp-logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: @app-theme-color;
  }
  .vueapp-menu {
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    a {
      color: #000;
      font-size: 16px;
      display: block;
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      & + a {
        margin-top: 10px;
      }
      &:hover {
        color: @app-theme-color;
      }
    }
    a.router-link-exact-active {
      color: @app-theme-color;
      background-color: #fff;
    }
  }
}
</style>
