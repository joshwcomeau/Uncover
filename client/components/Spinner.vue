<!-- HTML -->
<template>
  <div class="spinner">
    <div class="lines">
      <div class="line line-1"></div><!--
   --><div class="line line-2"></div><!--
   --><div class="line line-3"></div><!--
   --><div class="line line-4"></div>
    </div>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
export default {
  name: 'book-spinner',
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes riseAndFall {
  0% { transform: scale(0.5); }
  10% { transform: scale(1); }
  100% { transform: scale(0.5); }
}

$dot-size: 15px;


.spinner {
  position: relative;
  width: $dot-size * 4;
  height: $dot-size;
}

.lines {
  position: absolute;
  top: 0;
  left: 0;
  right: -100%;
  bottom: 0;
  white-space: nowrap;
  display: flex;
}

.line {
  display: block;
  width: $dot-size;
  height: $dot-size;
  margin: 0 1px;
  border-radius: 100%;

  &.line-1 {
    background: $green;
    animation: riseAndFall 1000ms infinite;
  }
  &.line-2 {
    background: $teal;
    animation: riseAndFall 1000ms 250ms infinite;
  }
  &.line-3 {
    background: $blue;
    animation: riseAndFall 1000ms 500ms infinite;
  }
  &.line-4 {
    background: $purple;
    animation: riseAndFall 1000ms 750ms infinite;
  }
}
</style>
