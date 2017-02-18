<template>
  <div class="max-width-wrapper">
    <slot>
      Whoops!
      You've created a MaxWidthWrapper component, but haven't passed it any children!
    </slot>
  </div>
</template>

<script>
export default {
  name: 'max-width-wrapper',
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.max-width-wrapper {
  position: relative;
  width: 100%;
  max-width: $maxWidth;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
