<!-- HTML -->
<template>
  <max-width-wrapper class="intro">
    <h2>So, I really like audiobooks,</h2>
    <p>and over the years I've accumulated a pretty sizeable list of authors I enjoy.</p>

    <p>When I finish a book and find myself in search of my next listen, I try to remember all the authors I like, and see if they have any new books.</p>

    <p>This is an error-prone process; I've likely missed tons of books over the years! I decided to build a tool to make this process better.</p>

    <p>Uncover is an aggregator that shows you all of your favourite authors' latest releases.<strong>It's not just for audiobooks</strong> - it currently supports print and e-books as well, and I like the idea of expanding it (movie directors? TV show episodes?).</p>

    <h4>Here are some sample authors:</h4>

    <ul class="track-list">
      <li class="track" v-for="track in sampleTrackList">
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
    </ul>
  </max-width-wrapper>
</template>


<!-- JAVASCRIPT -->
<script>
import MaxWidthWrapper from 'components/MaxWidthWrapper';
import Track from 'components/Track';


export default {
  name: 'intro',
  components: { TrackComponent: Track, MaxWidthWrapper },

  data() {
    return {
      sampleTrackList: [
        {
          id: '7044164',
          name: 'Scott Meyer',
          image: 'https://images.gr-assets.com/authors/1366826945p5/7044164.jpg',
          category: 'author',
          meta: { mediaTypes: 'audiobook' },
        }, {
          id: '7077654',
          name: 'Drew Hayes',
          image: 'https://images.gr-assets.com/authors/1367797581p5/7077654.jpg',
          category: 'author',
          meta: { mediaTypes: 'audiobook' },
        },
      ],
    };
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.intro {
  padding-top: 2rem;
}

</style>
