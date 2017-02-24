<!-- HTML -->
<template>
  <max-width-wrapper narrow class="add-track">
    <h2>Add Author</h2>

    <add-track-form />
  </max-width-wrapper>
</template>


<!-- JAVASCRIPT -->
<script>
import AddTrackForm from 'components/AddTrackForm';
import MaxWidthWrapper from 'components/MaxWidthWrapper';


export default {
  name: 'add-track',

  components: { AddTrackForm, MaxWidthWrapper },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.add-track {
  padding-top: 6rem;
  padding-bottom: 6rem;

  h2 {
    font-size: 36px;
    color: $white;
  }
}
</style>
