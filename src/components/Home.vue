<template>
  <div class="home">
    <!-- TODO: A proper onboarding component here, to get the user started -->
    <max-width-wrapper v-if="noTracksYet">
      No tracks yet! Add one
    </max-width-wrapper>

    <ul class="track-list">
      <li v-for="track in tracks">
        <track-item :title="track.title" :type="track.type" :items="track.items"></track-item>
      </li>
    </ul>
  </div>
</template>

<script>
import MaxWidthWrapper from './MaxWidthWrapper';
import TrackItem from './TrackItem';

export default {
  name: 'home',
  components: { MaxWidthWrapper, TrackItem },

  data: () => ({
    tracks: [
      {
        title: 'Drew Hayes',
        type: 'author',
        items: [
          {
            title: 'Going Rogue',
            imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51t8CkDk9NL._SY445_QL70_.jpg',
          }, {
            title: 'Corpies',
            imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51NexXGkXhL.jpg',
          }, {
            title: 'Super Powereds, Year 1',
            imgSrc: 'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01FE9GH0S&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=thunpearpubl-20',
          },
        ],
      },
      {
        title: 'Big Bang Theory',
        type: 'tv-show',
        items: [
          {
            title: 'S07E11',
          }, {
            title: 'S07E10',
          }, {
            title: 'S07E19',
          },
        ],
      },
    ],
  }),

  computed: {
    noTracksYet() {
      return !this.tracks || this.tracks.length === 0;
    },
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
