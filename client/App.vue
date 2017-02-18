<template>
  <div id="app">
    <app-header />
    <div id="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from 'components/AppHeader';

export default {
  name: 'app',

  components: { AppHeader },
};
</script>

<style lang="scss">
@import './styles/variables';

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

a {
  text-decoration: none;
}

*, *:before, *:after {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  color: $black;
}

#main-content {
  position: relative;
  z-index: 2;
  background: $darkgray;
  border-top: 1px solid lighten($darkgray, 5%);
}

.italic {
  font-style: italic;
}

.bold {
  font-weight: 900;
}

input[type="text"] {
  border: none;
  background: none;
  font-size: 16px;
  color: $black;
  outline: none;
}

</style>
