<template>
  <div class="new-track-cta">
    <button-component
      size="large"
      color="purple"
    >
      Add New Track
    </button-component>
  </div>
</template>


<script>
import Button from './Button';

export default {
  name: 'new-track-cta',
  components: {
    ButtonComponent: Button,
  },
};
</script>


<style scoped lang="scss">
@import '../constants/style-vars';


.new-track-cta {
  height: $track-height;
  border: 2px dashed $gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
