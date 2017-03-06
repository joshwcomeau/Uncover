<!-- HTML -->
<template>
  <nav class="main-navigation">
    <router-link to="/about" class="nav-item">
      About
    </router-link>
    <router-link to="/import-export" class="nav-item">
      Import / Export
    </router-link>
    <router-link to="/add-track" class="nav-item bold">
      Add Author
    </router-link>
  </nav>
</template>


<!-- JAVASCRIPT -->
<script>
import Button from './Button';

export default {
  name: 'main-navigation',

  components: {
    ButtonComponent: Button,
  },
};
</script>


<!-- STYLES -->
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

@media (max-width: $break-mobile) {
  .main-navigation {
    font-size: 14px;
    justify-content: center;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }
  }
}

</style>
