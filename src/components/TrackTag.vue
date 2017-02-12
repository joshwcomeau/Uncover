<template>
  <span class="track-tag" :class="type">
    {{ type | formatType }}
  </span>
</template>

<script>
export default {
  name: 'track-tag',

  props: ['type'],

  filters: {
    formatType(val) {
      return val
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.track-tag {
  display: block;
  padding: 3px 8px;
  border-radius: 4px;
  color: $white;
  background: $darkgray;
  font-size: 11px;
  font-weight: bold;

  &.author {
    background: $purple;
  }

  &.tv-show {
    background: $blue;
  }
}
</style>
