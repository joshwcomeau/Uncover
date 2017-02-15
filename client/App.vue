<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import './constants/style-vars';

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

#app {
  background: $darkgray;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  color: $black;
}
</style>
