<template>
  <max-width-wrapper class="home">
    <app-header />

    <!-- TODO: A proper onboarding component here, to get the user started -->
    <div v-if="noTracksYet">
      No tracks yet! Add one
    </div>

    <ul class="track-list">
      <li class="track" v-for="track in trackList">
        <track-component
          :title="track.title"
          :image="track.image"
          :category="track.category"
          :isFetching="track.isFetching"
          :items="track.items"
        ></track-component>
      </li>
      <li>
        <new-track-cta />
      </li>
    </ul>
  </max-width-wrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AppHeader from 'components/AppHeader';
import MaxWidthWrapper from './MaxWidthWrapper';
import Track from './Track';
import NewTrackCta from './NewTrackCta';


export default {
  name: 'home',
  components: { AppHeader, MaxWidthWrapper, TrackComponent: Track, NewTrackCta },

  computed: {
    ...mapGetters(['noTracksYet', 'trackList']),
  },

  methods: {
    ...mapActions(['updateTrackInfo']),
  },

  created() {
    // Fetch the items for our tracks
    this.updateTrackInfo(this.trackList);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/variables';

.home {
  p {
    font-style: italic;
  }
}
</style>
