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
@import '../constants/style-vars';

.track-item {
  display: inline-block;

  img {
    height: 150px;
    margin-right: 5px;
  }
}
</style>
