<template>
  <max-width-wrapper class="add-track">
    <h2>Add Track</h2>
  </max-width-wrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MaxWidthWrapper from './MaxWidthWrapper';


export default {
  name: 'home',
  components: { MaxWidthWrapper },

  computed: {
    ...mapGetters(['noTracksYet', 'trackList']),
  },

  methods: {
    ...mapActions(['updateTrackInfo']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.add-track {

}
</style>
