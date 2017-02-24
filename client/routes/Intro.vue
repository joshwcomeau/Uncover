<!-- HTML -->
<template>
  <div>
    <max-width-wrapper class="intro">
      <h2>So, I really like fiction.</h2>
      <p>
        I'm a voracious reader. Over the years, I've discovered a
        <a href="/">lot</a>
        <a href="/">of</a>
        <a href="/">fantastic</a>
        <a href="/">authors</a>.
      </p>

      <p>
        Whenever I finish a book, the hunt is on to discover my next read.
        I'll try to remember an author I haven't read in a while, and see if they have any new releases out. I'll repeat this process for all the authors I can think of.
      </p>

      <p>
        This is not a bulletproof process (it depends on my memory, after all, which is never a good idea). I've likely missed tons of fantastic books over the years.
      </p>

      <h3>💡 There has to be a better way!</h3>

      <p>Uncover is a tool to help solve this problem by tracking your favourite authors, and aggregating their new releases. It allows you to filter by media type, and sorts by newest release. Finding your next book is now a 1-step process.</p>

      <p>Uncover organizes these authors into rows. Here's an example:</p>

      <ul class="track-list">
        <li class="track" v-for="track in sampleTrackList">
          <track-component
            :id="track.id"
            :name="track.name"
            :image="track.image"
            :category="track.category"
            :isFetching="isFetching"
            :meta="track.meta"
            :items="track.items"
            :fetchTrackData="fetchTrackData"
          />
        </li>
      </ul>

      <h3>🚀 Features</h3>

      <ul class="features">
        <li>
          <strong>At-a-glance book discovery</strong>. The newest releases are always at the top of the page, so even with a large list of favourite authors, finding your next book is super quick.
        </li>
        <li>
          <strong>Customizable media types</strong>. For each author, you can select which media types you care about, between print, e-book, and audiobook.
        </li>
        <li>
          <strong>Cool stuff on the way</strong>. Uncover will soon handle a wider variety of content to track - TV shows, audiobook narrators, movie directors...
        </li>
        <li>
          <strong>No registration required</strong>. Uncover stores your preferences locally, so there's no need to sign up. Add your first author now!
        </li>
      </ul>
    </max-width-wrapper>

    <div class="add-track-wrapper">
      <max-width-wrapper narrow>
        <h2>Add Your First Author</h2>
        <AddTrackForm />
      </max-width-wrapper>
    </div>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
import { mapGetters } from 'vuex';
import values from 'lodash/values';

import { getTrackItems } from 'services/api';
import AddTrackForm from 'components/AddTrackForm';
import MaxWidthWrapper from 'components/MaxWidthWrapper';
import Track from 'components/Track';


export default {
  name: 'intro',
  components: { AddTrackForm, TrackComponent: Track, MaxWidthWrapper },

  data() {
    return {
      sampleTracks: {
        '7077654': {
          id: '7077654',
          name: 'Drew Hayes',
          image: 'https://images.gr-assets.com/authors/1367797581p5/7077654.jpg',
          category: 'author',
          meta: { mediaTypes: 'audiobook' },
        },
      },
    };
  },

  computed: {
    ...mapGetters(['numOfTracks']),
    sampleTrackList() {
      return values(this.sampleTracks);
    },
    isFetching() {
      const track = this.sampleTrackList[0];

      return !track.items;
    },
  },

  methods: {
    fetchTrackData(id) {
      const track = this.sampleTracks[id];

      getTrackItems(track).then((data) => {
        this.sampleTracks[id] = data;
      });
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.intro {
  padding-top: 2rem;
  font-size: 20px;
  color: $lightgray;

  h2 {
    font-size: 36px;
    margin: 3rem 0 1.75rem;
    color: $green;
  }

  h3 {
    margin-top: 3.5rem;
    font-size: 26px;
    color: $white;
  }

  h4 {
    margin: 2rem 0 3rem;
    font-size: 20px;
    color: $white;
  }

  p {
    margin-bottom: 1.75rem;
  }

  a {
    color: $white;
    font-weight: 500;
  }

  .track-list {
    margin-top: 4rem;
  }

  .features {
    list-style-type: square;
    margin-left: 1.5rem;

    li {
      margin-bottom: 1rem;
    }
  }
}

.add-track-wrapper {
  background: $black;
  border-top: 1px solid lighten($darkgray, 5%);
  box-shadow: inset 0px 2px 20px rgba(0,0,0,0.2);
  padding: 3rem 0;
  margin: 3rem 0;

  h2 {
    font-size: 36px;
    color: $white;
    margin-bottom: 2rem;
    text-shadow: 0px 1px 7px rgba(0,0,0,0.1);
  }
}

</style>
