<template>
  <li class="track-item">
    <img :src="src" />
  </li>
</template>

<script>
export default {
  name: 'track-item',

  props: ['src'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/variables';

.track-item {
  display: inline-block;

  img {
    height: $track-inner-height;
    margin-right: $track-padding;
    // box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    border-radius: 2px;
  }
}
</style>
