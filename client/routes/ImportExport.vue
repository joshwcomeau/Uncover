<!-- HTML -->
<template>
  <max-width-wrapper narrow class="import-export">
    <h2 class="heading">
      Import / Export
    </h2>

    <p>
      Uncover does not have any accounts system - this is by design, for two reasons:
    </p>

    <ol>
      <li><strong>Less friction.</strong> No convoluted sign-up process, you can start using Uncover immediately.</li>
      <li><strong>More secure.</strong> By not storing you data in any server database, you can rest assured that nobody will discover your guilty pleasures. Your data lives on your device.
    </ol>

    <p>
      The drawback to this system is that your data won't come with you from device to device: We store your settings on your phone or computer directly.
    </p>

    <p>
      As a solution, we implemented an import/export system. You can copy a block of jargon from one machine to another, and instantly populate your set of authors and preferences.
    </p>

    <h4>Export</h4>

    <pre>{{ exportData() }}</pre>

    <horizontal-rule />

    <h4>Import</h4>

    <textarea v-model="importData" />
    <div class="submit-import-button-container">
      <button-component
        class="submit-import-button"
        :disabled="!importData"
        size="large"
        color="purple"
        :handleClick="submitImportData"
      >
        Import Data
      </button-component>
    </div>
  </max-width-wrapper>
</template>


<!-- JAVASCRIPT -->
<script>
import mapValues from 'lodash/mapValues';
import { mapActions } from 'vuex';

import router from 'router';
import { LOCAL_STORAGE_KEY } from 'constants';

import Button from 'components/Button';
import HorizontalRule from 'components/HorizontalRule';
import MaxWidthWrapper from 'components/MaxWidthWrapper';


export default {
  name: 'import-export',

  components: { ButtonComponent: Button, HorizontalRule, MaxWidthWrapper },

  data() {
    return {
      importData: null,
      exportData: () => {
        const data = JSON.parse(
          window.localStorage.getItem(LOCAL_STORAGE_KEY),
        );

        if (!data) {
          return 'No data to export';
        }

        const tracksById = data.tracks.byId;
        const minimalTrackData = mapValues(tracksById, track => ({
          id: track.id,
          name: track.name,
          image: track.image,
          category: track.category,
          meta: track.meta,
        }));

        return JSON.stringify(minimalTrackData);
      },
    };
  },

  methods: {
    ...mapActions(['importTracks']),
    submitImportData() {
      this.importTracks(JSON.parse(this.importData));

      router.push('/');
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.import-export {
  padding-top: 6rem;
  padding-bottom: 8rem;
  color: $lightgray;

  h2 {
    color: $white;
  }

  h4 {
    color: $yellow;
    margin: 2rem 0 1rem;
  }

  ol {
    margin-bottom: 2rem;
  }

  li {
    margin-bottom: 1rem;
  }

  pre {
    white-space: normal;
    word-break: break-all;
  }

  textarea {
    display: block;
    width: 100%;
    height: 65px;
  }

  .submit-import-button-container {
    padding: 1.5rem;
    text-align: center;
  }

  .submit-import-button {
    width: 50%;
  }
}

</style>
