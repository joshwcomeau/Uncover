<template>
  <div class="app-header">
    <h1>Uncover</h1>
    <h4>Find out when new stuff is available. Track authors, TV shows, and more.</h4>
  </div>
</template>

<script>
import MaxWidthWrapper from './MaxWidthWrapper';

export default {
  name: 'app-header',
  data() {
    return {
      msg: 'Welcome to Hell',
    };
  },
  components: {
    MaxWidthWrapper,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/variables';

.app-header {
  padding-top: 5rem;
  padding-bottom: 3rem;

  h1 {
    font-size: 72px;
    line-height: 72px;
    margin: 0;
    margin-left: -5px;
    letter-spacing: -5px;
    color: $white;
  }

  h4 {
    font-size: 20px;
    margin-top: 0.5rem;
    color: $gray;
    font-weight: 500;
  }
}
</style>
