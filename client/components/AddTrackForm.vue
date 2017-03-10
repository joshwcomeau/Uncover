<!-- HTML -->
<template>
  <card-component class="add-track-form">
    <div class="form-section">
      <h4>Author</h4>
      <input-with-underline
        v-model="searchTerm"
        placeholder="eg. Scott Meyer"
        :iconName="searchIcon.name"
        :iconColor="searchIcon.color"
        :iconSpin="searchIcon.spin"
      />

      <div class="book-examples" v-if="exampleItems">
        <div class="cover"></div>
        <div class="contents">
          Matched <span class="author-name">{{ name }}</span>, author of
          <ul class="book-titles">
            <li v-for="item in exampleItems"><!--
           --><a :href="item.url" target="_blank"><!--
             -->{{ item.title }}<!--
           --></a><!--
         --></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Media Type</h4>
      <edit-media-types v-model="mediaTypes" />
    </div>

    <footer>
      <button-component
        :disabled="!isValid"
        size="large"
        color="purple"
        class="add-track-button"
        :handleClick="saveTrack"
      >
        Add Track
      </button-component>
    </footer>
  </card-component>
</template>


<!-- JAVASCRIPT -->
<script>
import debounce from 'lodash/debounce';
import { mapActions, mapGetters } from 'vuex';

import router from 'router';
import { getTrackInfo } from 'services/api';

import Button from 'components/Button';
import Card from 'components/Card';
import EditMediaTypes from 'components/EditMediaTypes';
import InputWithUnderline from 'components/InputWithUnderline';
import MaxWidthWrapper from 'components/MaxWidthWrapper';


export default {
  name: 'home',
  components: {
    ButtonComponent: Button,
    CardComponent: Card,
    EditMediaTypes,
    InputWithUnderline,
    MaxWidthWrapper,
  },

  data() {
    return {
      category: 'author',
      searchTerm: '',
      isSearching: false,
      id: null,
      name: null,
      image: null,
      items: null,
      mediaTypes: 'print',
    };
  },

  props: {
    heading: {
      type: String,
      default: 'Add Track',
    },
  },

  computed: {
    ...mapGetters(['trackIds']),
    searchIcon() {
      const isPristine = !this.name && !this.isSearching;

      if (isPristine) {
        return {};
      }

      return this.isSearching
        ? { name: 'material-sync', spin: true, flip: true, color: '#555' }
        : { name: 'material-check', spin: false, color: '#4CAF50' };
    },
    isValid() {
      return (
        this.category &&
        this.id &&
        this.name
      );
    },
    exampleItems() {
      if (!this.items) {
        return null;
      }

      return this.items.slice(0, 3).map(item => ({
        title: item.title,
        url: item.url,
      }));
    },
  },

  watch: {
    searchTerm(val) {
      this.resetTrackInfo();

      if (!val) {
        return;
      }

      this.isSearching = true;

      this.fetchTrackInfo();
    },
  },

  methods: {
    ...mapActions(['saveNewTrack']),

    resetTrackInfo({ id, name, image, items } = {}) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.items = items;
    },

    fetchTrackInfo: debounce(async function debouncedFetchTrackInfo() {
      const { searchTerm, category } = this;

      const trackInfo = await getTrackInfo({
        searchTerm,
        category,
      });

      this.isSearching = false;
      this.resetTrackInfo(trackInfo);
    }, 750),

    saveTrack() {
      // Validate that we're adding isn't already present.
      if (this.trackIds.includes(this.id)) {
        // eslint-disable-next-line no-alert
        alert("Sorry, it looks like you've already added this item!\n\nYou can modify an existing item by clicking the little gear on the track.");

        return;
      }

      const track = {
        id: this.id,
        name: this.name,
        image: this.image,
        category: this.category,
        meta: {
          mediaTypes: this.mediaTypes,
        },
      };

      this.saveNewTrack(track);

      router.push('/');
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 1
  }
  90% {
    transform: translateY(100%);
    opacity: 1
  }
  100% {
    transform: translateY(100%);
    opacity: 0
  }
}

$content-padding: 2rem;

.add-track-form {
  padding: $content-padding;
  line-height: 1.65;
}

.form-section {
  margin-bottom: $content-padding;
}

h2 {
  font-size: 36px;
  color: $white;
}

h4 {
  font-size: 22px;
}

h6 {
  font-size: 16px;
  margin-bottom: 0.5rem;
}

label {
  display: block;
  font-size: 14px;
}

.book-examples {
  position: relative;
  margin: 1.5rem 0;
  font-size: 13px;

  .author-name {
    font-weight: 700;
    color: $green;
  }

  .book-titles {
    display: inline;

    li {
      display: inline;

      &:after {
        content: ', ';
      }

      &:last-of-type::before {
        content: 'and ';
      }

      &:last-of-type::after {
        content: '.';
      }

      &:first-of-type::before {
        content: '' !important;
      }
    }

    a {
      color: $blue;
      font-weight: 500;
    }
  }
}

footer {
  text-align: center;
  margin-top: 2rem;

  .add-track-button {
    width: 250px;
    max-width: 100%;
  }
}

@media (max-width: $break-mobile) {
  .add-track-form {
    padding: $content-padding * 0.75;
  }
}
</style>
