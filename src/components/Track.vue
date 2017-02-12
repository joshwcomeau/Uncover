<template>
  <div class="track">
    <max-width-wrapper>
      <header>
        <h3>{{ title }}</h3>
        <track-tag class="track-tag" :type="type"></track-tag>
      </header>
      <ul>
        <track-item v-for="item in items" :src="item.imgSrc" :name="item.name"></track-item>
      </ul>
    </max-width-wrapper>
  </div>
</template>

<script>
import MaxWidthWrapper from './MaxWidthWrapper';
import TrackTag from './TrackTag';
import TrackItem from './TrackItem';

export default {
  name: 'track',
  components: { MaxWidthWrapper, TrackTag, TrackItem },

  props: ['title', 'type', 'items'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.track {
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
