<template>
  <div id="app">
    <component v-bind:is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: 'main-layout',
    };
  },
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  color: #000;
}
</style>
