<template>
  <div class="track" :class="type">
    <header>
      <img class="track-image" :src="image" />
      <h3 class="track-name">{{ title }}</h3>
      <h6 class="track-last-updated-at" v-if="lastUpdatedAt">Latest release: {{ lastUpdatedAt | formatDate }}</h6>
    </header>
    <ul class="track-items">
      <track-item v-for="item in items" :src="item.imgSrc" :name="item.name"></track-item>
    </ul>
  </div>
</template>


<script>
import dateFnsFormat from 'date-fns/format';

import MaxWidthWrapper from './MaxWidthWrapper';
import TrackTag from './TrackTag';
import TrackItem from './TrackItem';

export default {
  name: 'track',
  components: { MaxWidthWrapper, TrackTag, TrackItem },

  props: ['title', 'image', 'type', 'lastUpdatedAt', 'items'],

  filters: {
    formatDate: val => dateFnsFormat(val, 'MMM Do'),
  },
};
</script>


<style scoped lang="scss">
@import '../constants/style-vars';


.track {
  position: relative;
  background: $white;
  margin: 1.5rem 0;
  height: $track-height;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.075);
  display: flex;

  @media screen and (min-width: 600px) {
    &::before {
      content: '';
      position: absolute;
      top: $track-padding;
      left: $track-padding;
      bottom: $track-padding;
      width: 5px;
    }

    &.author::before {
      background: $purple;
    }

    &.tv-show::before {
      content: '';

      background: $blue;
    }
  }

  header {
    position: relative;
    width: 225px;
    height: $track-inner-height;
    color: $black;
    margin-left: $track-padding * 2;
    text-align: center;
    transform: translateY(-16px);

    .track-image {
      display: block;
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      object-fit: cover;
      object-position: center center;
      margin: auto;
      border: 3px solid $white;
      box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
    }

    .track-name {
      font-weight: 600;
      letter-spacing: -0.5px;
      line-height: 36px;
    }

    .track-last-updated-at {
      font-weight: 500;
      font-size: 12px;
      color: $gray;
      margin: 0;
    }
  }

  .track-items {
    flex: 1;
    background: $offwhite;
    border-left: 1px solid rgba(0,0,0,0.1);
    padding: $track-padding;
  }
}
</style>
