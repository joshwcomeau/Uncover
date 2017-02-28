<!-- HTML -->
<template>
  <div><!-- Group our Intro and AddTrack together -->
    <div class="intro" ref="introElement">
      <max-width-wrapper class="intro-wrapper">
        <h2>So, I really like fiction.</h2>
        <p>
          I'm a voracious reader. Over the years, I've discovered a
          <a href="https://www.goodreads.com/author/list/7044164.Scott_Meyer" target="_blank">lot</a>
          <a href="https://www.goodreads.com/author/list/7077654.Drew_Hayes" target="_blank">of</a>
          <a href="https://www.goodreads.com/author/list/10746.Jim_Butcher" target="_blank">fantastic</a>
          <a href="https://www.goodreads.com/author/list/4763.John_Scalzi" target="_blank">authors</a>.
        </p>

        <p>
          Whenever I finish a book, the hunt is on to discover my next read. For the past decade or so, this has been my process:
        </p>

        <ol>
          <li>Search my memory for an author I enjoyed, ideally one I haven't read in a while.</li>
          <li>Check to see if they have any new releases, by googling for them and poking around on their homepage.</li>
          <li>Repeat until I find a new book (or, more often, my memory fails me).</li>
        </ol>

        <p>
          Obviously, this is not a good system. I've probably missed tons of great books, and I've certainly wasted lots of time.
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
            <strong>Open-source</strong>. If you're a web developer, you can <a href="https://github.com/joshwcomeau/Uncover" target="_blank">fork it</a> and tweak it however you like.
          </li>
          <li>
            <strong>No registration required</strong>. Uncover stores your preferences locally, so there's no need to sign up. Add your first author now!
          </li>
        </ul>
      </max-width-wrapper>
    </div>

    <div class="add-track-wrapper">
      <div class="overlay" :style="{ opacity: addTrackOverlayOpacity }"></div>
      <max-width-wrapper narrow>
        <h2>Add Your First Author</h2>
        <AddTrackForm />
      </max-width-wrapper>
    </div>

    <div class="footer-border"></div>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
/* eslint-disable no-mixed-operators */
import { mapGetters } from 'vuex';
import values from 'lodash/values';

import { getTrackItems } from 'services/api';
import AddTrackForm from 'components/AddTrackForm';
import MaxWidthWrapper from 'components/MaxWidthWrapper';
import Track from 'components/Track';


export default {
  name: 'intro',
  components: { AddTrackForm, TrackComponent: Track, MaxWidthWrapper },

  created() {
    const spreadGradientOverHeight = 400;
    const spreadGradientOffset = 100;
    this.scrollHandler = window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const elementBottom = this.$refs.introElement.getBoundingClientRect().bottom;

      // Get the number of pixels of the visible form, clamping to 0
      // so that the number is never negative.
      const heightOfVisibleForm = Math.max(
        0,
        windowHeight - elementBottom,
      );

      // Normalize that value, between 0 and our spread height
      const normalizedValue = Math.min(
        1,
        (heightOfVisibleForm - spreadGradientOffset) / spreadGradientOverHeight * -1 + 1,
      );

      this.addTrackOverlayOpacity = normalizedValue;
    });
  },

  data() {
    return {
      addTrackOverlayOpacity: 0,
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

$add-track-height: 600px;

.intro {
  position: relative;
  z-index: 2;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 20px;
  color: $lightgray;
  background: $darkgray;
  margin-bottom: $add-track-height - $footer-height;
  border-bottom: 1px solid lighten($darkgray, 5%);
  box-shadow: 0px 2px 20px rgba(17, 17, 17, 1);

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

  ol {
    list-style-type: none;
    counter-reset: old-system-steps;
    padding-left: 2rem;
    margin-bottom: 3rem;

    li {
      margin-bottom: 1rem;
    }

    li:before {
      content: counter(old-system-steps);
      counter-increment: old-system-steps;
      color: $yellow;
      margin-right: 0.5rem;
      font-weight: 900;
    }
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

    strong {
      color: $yellow;
    }
  }
}

.add-track-wrapper {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  height: $add-track-height;
  background: $black;
  padding: 3rem 0;

  h2 {
    font-size: 36px;
    color: $white;
    margin-bottom: 2rem;
    text-shadow: 0px 1px 7px rgba(0,0,0,0.1);
  }

  .overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #111111;
    pointer-events: none;
  }
}

.footer-border {
  position: relative;
  z-index: 2;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
}

</style>
