<!-- HTML -->
<template>
  <div class="new-track-cta">
    <button-component
      size="large"
      color="purple"
      :handleClick="goToAddTrackPage"
    >
      Add New Track
    </button-component>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
import Button from './Button';
import router from '../router';

export default {
  name: 'new-track-cta',
  components: {
    ButtonComponent: Button,
  },

  methods: {
    goToAddTrackPage() {
      router.push('add-track');
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';


.new-track-cta {
  height: $track-height;
  border: 2px dashed $gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
