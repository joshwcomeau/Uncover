<!-- HTML -->
<template>
  <div class="header-wrapper">
    <header class="header">
      <max-width-wrapper class="wrapper">
        <h1>
          <router-link to="/" class="home-link">
            Uncover
          </router-link>
        </h1>
        <main-navigation />
      </max-width-wrapper>
    </header>
    <div class="header-spacer"></div>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
import MaxWidthWrapper from './MaxWidthWrapper';
import MainNavigation from './MainNavigation';

export default {
  name: 'app-header',

  components: {
    MaxWidthWrapper,
    MainNavigation,
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.header {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;

  h1 {
    position: absolute;
    left: 3rem;
    bottom: 6px;
    font-size: 56px;
    letter-spacing: -2px;
  }

  .home-link {
    color: $white;
  }
}

.header-spacer, .wrapper {
  position: relative;
  height: $header-height;
}

@media (max-width: $break-mobile) {
  .header h1 {
    left: 0;
    right: 0;
    text-align: center;
  }
}

</style>
