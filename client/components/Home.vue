<!-- HTML -->
<template>
  <max-width-wrapper class="home">
    <div v-if="noTracksYet">
      No tracks yet! Add one
    </div>

    <ul class="track-list">
      <li class="track" v-for="track in sortedTrackList">
        <track-component
          :id="track.id"
          :name="track.name"
          :image="track.image"
          :category="track.category"
          :isFetching="track.isFetching"
          :meta="track.meta"
          :items="track.items"
        />
      </li>
      <li class="track">
        <new-track-cta />
      </li>
    </ul>
  </max-width-wrapper>
</template>


<!-- JAVASCRIPT -->
<script>
import { mapGetters } from 'vuex';

import router from 'router';
import AppHeader from 'components/AppHeader';
import MaxWidthWrapper from './MaxWidthWrapper';
import Track from './Track';
import NewTrackCta from './NewTrackCta';


export default {
  name: 'home',
  components: {
    AppHeader,
    MaxWidthWrapper,
    TrackComponent:
    Track,
    NewTrackCta,
  },

  created() {
    if (this.noTracksYet) {
      router.push('/intro');
    }
  },

  computed: {
    ...mapGetters(['noTracksYet', 'sortedTrackList']),
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes riseAndFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home {
  padding-top: 2rem;
}

@for $trackNum from 1 through 50 {
  .track:nth-child(#{$trackNum}) {
    animation: riseAndFade 750ms ease-out #{$trackNum * 75}ms both;
  }
}

</style>
