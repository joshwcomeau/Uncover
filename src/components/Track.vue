<template>
  <div class="track" :class="category">
    <header>
      <img class="track-image" :src="image" />

      <h3 class="track-name">{{ title }}</h3>
      <h6 class="track-last-updated-at" v-if="mostRecentUpdate">Latest release: {{ mostRecentUpdate | formatDate }}</h6>

      <div class="track-actions">
        <button-component
          icon="material-settings"
          iconColor="#9E9E9E"
          no-border
        />
      </div>
    </header>

    <ul class="track-items">
      <track-item v-for="item in items" :src="item.image" :name="item.name"></track-item>
    </ul>

    <div class="resize-handle-container">
      <div class="resize-handle">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>


<script>
import dateFnsFormat from 'date-fns/format';
import get from 'lodash/get';

import Button from './Button';
import MaxWidthWrapper from './MaxWidthWrapper';
import TrackTag from './TrackTag';
import TrackItem from './TrackItem';

export default {
  name: 'track',
  components: {
    ButtonComponent: Button,
    MaxWidthWrapper,
    TrackTag,
    TrackItem,
  },

  computed: {
    mostRecentUpdate() {
      return get(this.items, '0.releaseDate');
    },
  },

  props: ['title', 'image', 'category', 'isFetching', 'items'],

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
  box-shadow: 0px 4px 20px rgba(0,0,0,0.5);
  display: flex;
  border-radius: 2px;

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

    .track-actions {
      margin-top: 18px;
    }
  }

  .track-items {
    position: relative;
    flex: 1;
    background: $offwhite;
    border-left: 1px solid rgba(0,0,0,0.1);
    border-right: 1px solid rgba(0,0,0,0.1);
    padding: $track-padding;
    overflow: hidden;
    white-space: nowrap;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: $track-padding;
      background: $offwhite;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 50px;
      background: linear-gradient(90deg, rgba(245,245,245,0), rgba(245,245,245,1));
      pointer-events: none;
    }
  }

  $resize-handle-size: 24px;

  &:hover .resize-handle-container {
    .resize-handle {
      opacity: 1;
    }
  }

  .resize-handle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $resize-handle-size;

    .resize-handle {
      width: $resize-handle-size;
      opacity: 0;
      transition: opacity 500ms;
      cursor: grab;

      .bar {
        width: $resize-handle-size - 6px;
        height: 2px;
        margin: 2px 3px;
        background: $lightgray;
      }
    }
  }
}
</style>
