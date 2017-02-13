<template>
  <max-width-wrapper class="home">
    <!-- TODO: A proper onboarding component here, to get the user started -->
    <div v-if="noTracksYet">
      No tracks yet! Add one
    </div>

    <ul class="track-list">
      <li class="track" v-for="track in tracks">
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
import MaxWidthWrapper from './MaxWidthWrapper';
import Track from './Track';

export default {
  name: 'home',
  components: { MaxWidthWrapper, TrackComponent: Track },

  data: () => ({
    tracks: [
      {
        title: 'Drew Hayes',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51l0kTIGm3L._UX250_.jpg',
        type: 'author',
        lastUpdatedAt: 1486950609300,
        items: [
          {
            name: 'Going Rogue',
            imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51t8CkDk9NL._SY445_QL70_.jpg',
          }, {
            name: 'Corpies',
            imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51NexXGkXhL.jpg',
          }, {
            name: 'Super Powereds, Year 1',
            imgSrc: 'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01FE9GH0S&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=thunpearpubl-20',
          },
        ],
      },
      {
        title: 'Big Bang Theory',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/The_Big_Bang_Theory_(Official_Title_Card).png/250px-The_Big_Bang_Theory_(Official_Title_Card).png',
        type: 'tv-show',
        lastUpdatedAt: 1483930309300,
        items: [
          {
            name: 'S07E11',
          }, {
            name: 'S07E10',
          }, {
            name: 'S07E19',
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
