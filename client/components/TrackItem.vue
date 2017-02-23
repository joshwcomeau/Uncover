<!-- HTML -->
<template>
  <li class="track-item">
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <img :alt="title" :title="title" :src="src" />
    </a>
  </li>
</template>


<!-- JAVASCRIPT -->
<script>
export default {
  name: 'track-item',

  props: ['title', 'src', 'url'],
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.track-item {
  display: inline-block;

  img {
    display: block;
    height: $track-inner-height;
    margin-right: $track-padding;
    // box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    border-radius: 2px;
  }
}
</style>
