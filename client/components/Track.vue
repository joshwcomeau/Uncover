<template>
  <card-component class="track" :class="category">
    <header>
      <div class="header-details">
        <img class="track-image" :src="image" />

        <h3 class="track-name">{{ name }}</h3>
        <h6 class="track-last-updated-at" v-if="latestReleaseDate">Latest release: {{ latestReleaseDate | formatDate }}</h6>
      </div>

      <div class="track-actions">
        <button-component
          :handleClick="toggleEditing"
          icon="material-settings"
          iconColor="#9E9E9E"
          no-border
        />
      </div>
    </header>

    <section class="main-content">
      <div class="track-item-wrapper" v-if="!isEditing">
        <ul class="track-items" v-if="!isFetching">
          <track-item
            v-for="item in items"
            :src="item.image"
            :title="item.title"
            :url="item.url"
          />
        </ul>

        <div v-if="isFetching">
          <spinner-component class="spinner" />

          <div class="placeholders">
            <!-- Generate a few "blank" books while it loads -->
            <div class="placeholder" v-for="n in 8"></div>
          </div>
        </div>
      </div>

      <div class="settings" v-if="isEditing">
        <h4>Media Types</h4>
        <label>
          <input
            type="checkbox"
            value="print"
            v-model="mediaTypes"
          />
          Print
        </label>

        <label>
          <input
            type="checkbox"
            value="ebook"
            v-model="mediaTypes"
          />
          E-Book
        </label>

        <label>
          <input
            type="checkbox"
            value="audiobook"
            v-model="mediaTypes"
          />
          Audiobook
        </label>
      </div>
    </section>
  </card-component>
</template>


<script>
import { mapActions } from 'vuex';
import dateFnsFormat from 'date-fns/format';
import get from 'lodash/get';

import Button from './Button';
import Card from './Card';
import MaxWidthWrapper from './MaxWidthWrapper';
import Spinner from './Spinner';
import TrackTag from './TrackTag';
import TrackItem from './TrackItem';

export default {
  name: 'track',
  components: {
    ButtonComponent: Button,
    CardComponent: Card,
    MaxWidthWrapper,
    SpinnerComponent: Spinner,
    TrackTag,
    TrackItem,
  },

  data() {
    return {
      isEditing: false,
    };
  },

  methods: {
    ...mapActions(['updateTrackMetadata']),
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
  },

  computed: {
    latestReleaseDate() {
      return get(this.items, '0.releaseDate');
    },
    mediaTypes: {
      get() { return this.meta.mediaTypes; },
      set(val) {
        this.updateTrackMetadata({
          trackId: this.id,
          meta: {
            mediaTypes: val,
          },
        });
      },
    },
  },

  props: [
    'id', 'name', 'image', 'category', 'meta', 'isFetching', 'items',
  ],

  filters: {
    formatDate: val => dateFnsFormat(val, 'MMM Do YYYY'),
  },
};
</script>


<style scoped lang="scss">
@import '../styles/variables';


.track {
  position: relative;
  height: $track-height;
  display: flex;

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
    background: $blue;
  }

  header {
    position: relative;
    width: 225px;
    height: $track-inner-height;
    color: $black;
    margin-left: $track-padding * 2;
    text-align: center;

    .header-details {
      transform: translateY(-8px);
    }

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

  .main-content {
    position: relative;
    height: $track-height;
    background: $offwhite;
    flex: 1;
    border-left: 1px solid rgba(0,0,0,0.1);
    border-radius: 0 2px 2px 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .track-item-wrapper {
    padding: $track-padding;

    &:after {
      content: '';
      position: absolute;
      top: $track-padding;
      right: $track-padding;
      bottom: $track-padding;
      width: 30px;
      background: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.3));
      pointer-events: none;
    }

    .track-items {
      position: relative;
      margin-bottom: -30px;
      padding-bottom: 30px;
      overflow-x: scroll;
      overflow-y: hidden;
    }

    .spinner {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .placeholders {
      overflow: hidden;

      .placeholder {
        display: inline-block;
        width: $track-height - $track-padding * 2;
        height: $track-height - $track-padding * 2;
        background: rgba(0,0,0,0.1);
        border-radius: 2px;
        margin-right: $track-padding;
      }
    }
  }

  .settings {
    padding: 1rem;

    h4 {
      padding-bottom: 0.25rem;
    }

    label {
      margin-right: 3rem;
    }
  }


  @media screen and (max-width: $break-mobile) {
    flex-direction: column;
    height: auto;

    &:before {
      display: none;
    }

    header {
      width: auto;
      height: auto;
      margin-left: 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);

      .header-details {
        transform: translateY(-16px);
      }
    }

    .track-actions {
      position: absolute;
      top: 0;
      right: 0;
    }
    .main-content {
      border-radius: 0 0 2px 2px;
    }
  }
}
</style>
