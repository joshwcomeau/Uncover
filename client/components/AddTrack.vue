<template>
  <max-width-wrapper class="add-track" maxWidthOverride="500">
    <h2>Add Track</h2>

    <card-component class="main-content">
      <div class="form-section">
        <h4>Category</h4>
        <label>
          <input type="radio" v-model="category" value="author" />
          Author
        </label>

        <label>
          <input type="radio" v-model="category" value="tv-show" disabled />
          TV Show <span class="italic">(coming soon!)</span>
        </label>
      </div>

      <div class="form-section">
        <h4>Author</h4>
        <input-with-underline
          v-model="searchTerm"
          placeholder="eg. Drew Hayes"
          :iconName="searchIcon.name"
          :iconColor="searchIcon.color"
          :iconSpin="searchIcon.spin"
        />

        <div class="book-examples" v-if="items">
          <div class="cover"></div>
          <div class="contents">
            <h6>Examples from this author:</h6>

            <ul class="book-example-list">
              <li v-for="item in items">
                <img class="book-example" :src="item.image" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-section">
          <h4>Media Types</h4>
          <label>
            <input type="checkbox" v-model="mediaTypes" value="print" />
            Print
          </label>

          <label>
            <input type="checkbox" v-model="mediaTypes" value="ebook" />
            E-Book
          </label>

          <label>
            <input type="checkbox" v-model="mediaTypes" value="audiobook" />
            Audiobook
          </label>
        </div>
        <div class="form-section">
          <h4>Language</h4>
          <label>
            <input type="checkbox" v-model="language" value="en" />
            English
          </label>

          <label>
            <input type="checkbox" v-model="language" value="fr" />
            French
          </label>

          <label>
            <input type="checkbox" v-model="language" value="sp" />
            Spanish
          </label>
        </div>
      </div>

    </card-component>

  </max-width-wrapper>
</template>

<script>
import debounce from 'lodash/debounce';

import { getTrackInfo } from '../services/api';

import MaxWidthWrapper from './MaxWidthWrapper';
import Card from './Card';
import InputWithUnderline from './InputWithUnderline';


export default {
  name: 'home',
  components: {
    MaxWidthWrapper,
    CardComponent: Card,
    InputWithUnderline,
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
      mediaTypes: ['print'],
      language: ['en'],
    };
  },

  computed: {
    searchIcon() {
      const isPristine = !this.name && !this.isSearching;

      if (isPristine) {
        return {};
      }

      return this.isSearching
        ? { name: 'material-sync', spin: true, flip: true, color: '#555' }
        : { name: 'material-check', spin: false, color: '#4CAF50' };
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
    }, 200),
  },
};
</script>


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


.add-track {
  padding: 6rem 0;
  max-width: 650px;
}

.main-content {
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
  margin: 1.5rem $content-padding * -1;
  overflow: hidden;

  .cover {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $white;

    animation: slideDown 1000ms both 250ms;
  }

  .contents {
    position: relative;
    z-index: 1;
    padding: 1rem $content-padding;
    background: $offwhite;
    box-shadow: inset 0px 1px 4px rgba(0,0,0,0.2);
  }
}
.book-example-list {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;

  .book-example {
    height: 100px;
    margin-right: 0.5rem;
  }
}

.row {
  display: flex;
  justify-content: space-between;

  & > div {
    flex: 1;
    padding-right: 1rem;
  }
}
</style>
