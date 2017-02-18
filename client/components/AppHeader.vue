<template>
  <div class="header-wrapper">
    <header class="header">
      <max-width-wrapper>
        <h1>Uncover</h1>
        <main-navigation />
      </max-width-wrapper>
    </header>
    <div class="header-spacer"></div>
  </div>
</template>

<script>
import MaxWidthWrapper from './MaxWidthWrapper';

export default {
  name: 'app-header',

  components: {
    MaxWidthWrapper,
  },
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: $black;
  border-bottom: 1px solid lighten($darkgray, 5%);

  h1 {
    font-size: 24px;
    line-height: $header-height - 2px;
    margin: 0;
    letter-spacing: -1px;
    color: $white;
  }
}

.header-spacer {
  position: relative;
  height: $header-height;
}
</style>
