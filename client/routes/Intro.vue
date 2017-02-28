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
          <li class="track">
            <track-component
              :id="sampleTrack.id"
              :name="sampleTrack.name"
              :image="sampleTrack.image"
              :category="sampleTrack.category"
              :isFetching="isFetching"
              :meta="sampleTrack.meta"
              :items="sampleTrack.items"
              :fetchTrackData="fetchTrackData"
              :updateTrackMetadata="updateTrackMetadata"
              :deleteTrack="deleteTrack"
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

    <section class="add-track" :style="{ transform: addTrackTranslate }">
      <div class="add-track-contents" :style="{ opacity: addTrackOpacity }">
        <max-width-wrapper narrow style="{ opacity: addTrackOpacity }">
          <h2>Add Your First Author</h2>
          <AddTrackForm />
        </max-width-wrapper>
      </div>
    </section>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
/* eslint-disable no-mixed-operators */
import { mapGetters } from 'vuex';
import clamp from 'lodash/clamp';

import { getTrackItems } from 'services/api';
import AddTrackForm from 'components/AddTrackForm';
import MaxWidthWrapper from 'components/MaxWidthWrapper';
import Track from 'components/Track';


// TODO: Is there a way to share this value between JS and SCSS?
const totalFormHeight = 650;

export default {
  name: 'intro',
  components: { AddTrackForm, TrackComponent: Track, MaxWidthWrapper },

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data() {
    return {
      addTrackOpacity: 0,
      addTrackTranslate: 0,
      sampleTrack: {
        id: '7077654',
        name: 'Drew Hayes',
        image: 'https://images.gr-assets.com/authors/1367797581p5/7077654.jpg',
        category: 'author',
        meta: { mediaTypes: 'audiobook' },
      },
    };
  },

  computed: {
    ...mapGetters(['numOfTracks']),
    isFetching() {
      return !this.sampleTrack.items;
    },
  },

  methods: {
    fetchTrackData() {
      const track = this.sampleTrack;

      getTrackItems(track).then((data) => {
        this.sampleTrack = data;
      });
    },

    updateTrackMetadata({ meta }) {
      this.sampleTrack.meta = meta;

      this.fetchTrackData();
    },

    deleteTrack() {
      alert("Hey! Don't do that!")
    },

    handleScroll() {
      const elem = this.$refs.introElement
      const elementBottom = elem.getBoundingClientRect().bottom;

      // Get the number of pixels of the visible form.
      // Ensure the value is between 0 and our total form height.
      const heightOfVisibleForm = clamp(
        window.innerHeight - elementBottom,
        0,
        totalFormHeight,
      );

      // Calculate the opacity as a value between 0 and 1.
      const opacity = clamp(heightOfVisibleForm / totalFormHeight, 0, 1);
      this.addTrackOpacity = opacity;

      // Calculate the translate, which is inversely related to the
      // visible form height
      const translate = 125 - Math.ceil(opacity * 125);
      this.addTrackTranslate = `translateY(${translate}px)`;
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

$add-track-height: 645px;

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

.add-track {
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
