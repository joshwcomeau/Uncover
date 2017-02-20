<template>
  <max-width-wrapper class="home">
    <h4 class="heading">
      <span class="tighter">Y</span>our <span class="tighter">T</span>racks
    </h4>

    <!-- TODO: A proper onboarding component here, to get the user started -->
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
    ...mapGetters(['noTracksYet', 'sortedTrackList']),
  },

  methods: {
    ...mapActions(['fetchTrackData']),
  },

  created() {
    // Fetch the items for our tracks
    this.fetchTrackData(this.sortedTrackList);
  },
};
</script>


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

.heading {
  padding: 5rem 0 0.5rem;
  font-size: 40px;
  color: $white;
  letter-spacing: -1px;

  .tighter {
    letter-spacing: -6px;
  }
}

@for $trackNum from 1 through 10 {
  .track:nth-child(#{$trackNum}) {
    animation: riseAndFade 750ms ease-out #{$trackNum * 250 - 150}ms both;
  }
}

</style>
