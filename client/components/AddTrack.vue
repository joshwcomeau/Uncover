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
        <input-with-underline v-model="searchTerm" :iconName="searchIcon" />
        {{ searchTerm }}
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
    };
  },

  computed: {
    searchIcon() {
      if (!this.title && !this.isSearching) {
        return null;
      }

      return this.isSearching ? 'material-sync' : 'material-settings';
    },
  },

  watch: {
    searchTerm() {
      this.fetchTrackInfo();
    },
  },

  methods: {
    fetchTrackInfo: debounce(async function debouncedFetchTrackInfo() {
      const { searchTerm, category } = this;

      this.isSearching = true;

      const trackInfo = await getTrackInfo({ searchTerm, category });
      console.log({ trackInfo });
    }, 200),
  },
};
</script>


<style scoped lang="scss">
@import '../constants/style-vars';

.add-track {
  padding: 6rem 0;
  max-width: 650px;
}

.main-content {
  padding: 2rem;
  line-height: 1.65;
}

.form-section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 36px;
  color: $white;
}

h4 {
  font-size: 22px;
}

label {
  display: block;
  font-size: 14px;
}
</style>
