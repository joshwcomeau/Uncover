<!-- HTML -->
<template>
  <card-component class="track" :class="category">
    <div class="notification-bar" :class="{ bright: hasUnseenRelease }"></div>

    <header>
      <div class="header-details">
        <img class="track-image" :src="image" />

        <h3 class="track-name">{{ name }}</h3>
        <h6 class="track-last-updated-at" v-if="latestReleaseDate">
          Latest release: {{ latestReleaseDate | formatDate }}
        </h6>
      </div>

      <div class="track-actions">
        <button @click="toggleEditing">
          <icon
            class="settings-toggle-icon"
            name="material-settings"
            :size="16"
          />
        </button>
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
        <h4>Media Type</h4>
        <edit-media-types v-model="mediaTypes" />

        <footer>
          <button-component
            icon="material-keyboard_return"
            iconColor="white"
            color="teal"
            :handleClick="toggleEditing"
          >
            Return
          </button-component>
          <button-component
            icon="material-delete"
            iconColor="white"
            color="red"
            :handleClick="() => deleteTrack(this.id)"
          >
            Delete
          </button-component>
        </footer>
      </div>
    </section>
  </card-component>
</template>


<!-- JAVASCRIPT -->
<script>
import dateFnsFormat from 'date-fns/format';
import get from 'lodash/get';
import icon from 'vue-icons/icon';

import Button from './Button';
import Card from './Card';
import EditMediaTypes from './EditMediaTypes';
import MaxWidthWrapper from './MaxWidthWrapper';
import Spinner from './Spinner';
import TrackTag from './TrackTag';
import TrackItem from './TrackItem';

export default {
  name: 'track',
  components: {
    ButtonComponent: Button,
    CardComponent: Card,
    EditMediaTypes,
    icon,
    MaxWidthWrapper,
    SpinnerComponent: Spinner,
    TrackTag,
    TrackItem,
  },

  props: {
    id: String,
    name: String,
    image: String,
    category: String,
    meta: Object,
    items: Array,
    isFetching: Boolean,
    hasUnseenRelease: Boolean,
    fetchTrackData: Function,
    updateTrackMetadata: Function,
    deleteTrack: Function,
  },

  data() {
    return { isEditing: false };
  },

  methods: {
    toggleEditing() {
      this.$emit('toggleEdit');
      this.isEditing = !this.isEditing;
    },
  },

  created() {
    this.fetchTrackData(this.id);
  },

  computed: {
    latestReleaseDate() { return get(this.items, '0.releaseDate'); },

    mediaTypes: {
      get() { return this.meta.mediaTypes; },
      set(val) {
        this.updateTrackMetadata({
          trackId: this.id,
          meta: { mediaTypes: val },
        });
      },
    },
  },

  filters: {
    formatDate: val => dateFnsFormat(val, 'MMM Do YYYY'),
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.track {
  position: relative;
  height: $track-height;
  display: flex;
  color: $black;

  .notification-bar {
    position: absolute;
    top: $track-padding;
    left: $track-padding;
    bottom: $track-padding;
    background: $gray;
    width: 5px;

    &.bright {
      background: darken($blue, 20%);

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $blue;
        animation: fadeInOut 4000ms infinite
      }
    }
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
      button {
        padding: 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;

        &:hover .settings-toggle-icon {
          opacity: 1;
        }
      }
      .settings-toggle-icon {
        color: $darkgray;
        opacity: 0.5;
        transition: opacity 250ms;
      }
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

    footer {
      position: absolute;
      left: 1rem;
      right: 1rem;
      bottom: 1rem;
      display: flex;
      justify-content: space-between;
    }
  }


  @media screen and (max-width: $break-mobile) {
    flex-direction: column;
    height: auto;

    .notification-bar {
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
