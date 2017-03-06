<!-- HTML -->
<template>
  <div class="max-width-wrapper" :class="{ narrow }">
    <slot>
      Whoops!
      You've created a MaxWidthWrapper component, but haven't passed it any children!
    </slot>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
export default {
  name: 'max-width-wrapper',

  props: {
    narrow: Boolean,
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.max-width-wrapper {
  position: relative;
  width: 100%;
  max-width: $maxWidth;
  padding-left: 3rem;
  padding-right: 3rem;
  margin-left: auto;
  margin-right: auto;

  &.narrow {
    max-width: $maxWidthNarrow;
  }
}

@media (max-width: $break-mobile) {
  .max-width-wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

</style>
