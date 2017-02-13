<template>
  <max-width-wrapper class="home">
    <!-- TODO: A proper onboarding component here, to get the user started -->
    <div v-if="noTracksYet">
      No tracks yet! Add one
    </div>

    <ul class="track-list">
      <li class="track" v-for="track in trackList">
        <track-component
          :title="track.title"
          :image="track.image"
          :type="track.type"
          :items="track.items"
          :lastUpdatedAt="track.lastUpdatedAt"
        ></track-component>
      </li>
    </ul>
  </max-width-wrapper>
</template>

<script>
import { mapGetters } from 'vuex';

import MaxWidthWrapper from './MaxWidthWrapper';
import Track from './Track';


export default {
  name: 'home',
  components: { MaxWidthWrapper, TrackComponent: Track },

  computed: {
    ...mapGetters(['noTracksYet', 'trackList']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.home {
  p {
    font-style: italic;
  }
}
</style>
