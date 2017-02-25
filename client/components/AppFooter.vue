<!-- HTML -->
<template>
  <footer class="footer">
    Copyright 📘 2017-present <a href="https://github.com/joshwcomeau">Joshua Comeau</a>.
  </footer>
</template>


<!-- JAVASCRIPT -->
<script>
import MaxWidthWrapper from './MaxWidthWrapper';

export default {
  name: 'app-header',

  components: {
    MaxWidthWrapper,
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.footer {
  position: relative;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background: $darkgray;
  color: $gray;
  font-size: 14px;

  a {
    display: inline-block;
    padding-left: 4px;
    color: $blue;
    font-weight: 700;
  }
}
</style>
