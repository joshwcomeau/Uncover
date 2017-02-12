<template>
  <div class="app-header">
    <h1>Uncover</h1>
    <h4>Track books, TV shows, and more.</h4>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      msg: 'Welcome to Hell',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.app-header {
  h1 {
    font-size: 28px;
    color: $blue;
  }

  h4 {
    font-size: 16px;
    color: $red;
  }
}
</style>
