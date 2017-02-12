<template>
  <div class="track-item">
    <max-width-wrapper>
      <header>
        <h3>{{ title }}</h3>
        <track-tag class="track-tag" :type="type"></track-tag>
      </header>
      <ul>
        <li v-for="item in items">
          <img :src="item.src" />
        </li>
      </ul>
    </max-width-wrapper>
  </div>
</template>

<script>
import MaxWidthWrapper from './MaxWidthWrapper';
import TrackTag from './TrackTag';

export default {
  name: 'track-item',
  components: { MaxWidthWrapper, TrackTag },

  props: ['title', 'type', 'items'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.track-item {
  position: relative;
  background: $lightgray;
  border-bottom: 1px solid $gray;
  padding: 0.5rem;

  .track-tag {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
