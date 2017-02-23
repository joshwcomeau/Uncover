<!-- HTML -->
<template>
  <div class="horizontal-rule">
    <icon class="icon" name="fa-book" :size="16" />
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
import icon from 'vue-icons/icon';

import { LOCAL_STORAGE_KEY } from '../constants';

import MaxWidthWrapper from './MaxWidthWrapper';

export default {
  name: 'import-export',

  components: { icon, MaxWidthWrapper },

  data() {
    return {
      exportData: () => window.localStorage.getItem(LOCAL_STORAGE_KEY),
    };
  },

  props: {
    icon: {
      type: String,
      default: 'book',
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.horizontal-rule {
  position: relative;
  width: 100%;
  height: 17px;
  margin: 2rem 0;
  display: flex;
  justify-content: center;

  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 1px;
    background: #FFF;
  }

  &:before {
    left: 0;
    right: calc(50% + 12px);
  }

  &:after {
    left: calc(50% + 12px);
    right: 0;
  }
}
</style>
