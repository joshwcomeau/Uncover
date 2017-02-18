<template>
  <nav class="main-navigation">
    <router-link to="/about" class="nav-item">
      About
    </router-link>
    <router-link to="/settings" class="nav-item">
      Settings
    </router-link>
    <router-link to="/add-track" class="nav-item bold">
      Add Track
    </router-link>
  </nav>
</template>


<script>
import Button from './Button';

export default {
  name: 'main-navigation',

  components: {
    ButtonComponent: Button,
  },
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.main-navigation {
  position: relative;
  display: flex;
  justify-content: flex-end;
  color: $white;
}

.nav-item {
  padding: 1rem;
  font-weight: 500;

  &.bold {
    font-weight: 900;
  }

  &:first-of-type {
    color: $white;
  }

  &:nth-of-type(2) {
    color: $white;
  }

  &:nth-of-type(3) {
    color: $yellow;
  }
}
</style>
