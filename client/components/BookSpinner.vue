<!-- Template -->
<template>
  <div class="book-spinner">
    <div class="page page-1"></div>
    <div class="page page-2"></div>
    <div class="page-backdrop page-backdrop-left"></div>
    <div class="page-backdrop page-backdrop-right"></div>
    <div class="cover cover-left"></div>
    <div class="cover cover-right"></div>
  </div>
</template>


<!-- Logic -->
<script>
export default {
  name: 'book-spinner',
};
</script>


<!-- Styles -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes flipRotate {
  0% { transform: rotateY(-30deg); }
  100% { transform: rotateY(-150deg); }
}

@keyframes flipColor {
  0% { background: #FFF; }
  50% { background: #DDD; }
  100% { background: #FFF; }
}

$book-width: 76px;
$book-height: 50px;
$book-cover-padding: 4px;

.book-spinner {
  position: relative;
  width: $book-width;
  height: $book-height;
  perspective: 200px;
  box-shadow: 0px 6px 50px rgba(0,0,0,0.25);
}

.cover {
  position: absolute;
  z-index: 1;
  top: 0;
  width: $book-width / 2;
  height: $book-height;
  background: $teal;

  &.cover-left {
    left: 0;
    transform-origin: right center;
    transform: rotateY(30deg);
  }
  &.cover-right {
    right: 0;
    transform-origin: left center;
    transform: rotateY(-30deg);
  }
}

.page {
  position: absolute;
  z-index: 3;
  top: $book-cover-padding;
  right: $book-cover-padding;
  width: $book-width / 2 - $book-cover-padding;
  height: $book-height - $book-cover-padding * 2;
  background: #FFF;
  transform-origin: left center;

  &.page-1 {
    animation:
      flipRotate 2s infinite linear,
      flipColor 2s cubic-bezier(.4, 0, .6, 0) infinite both
    ;
  }

  &.page-2 {
    animation:
      flipRotate 2s infinite linear 1s,
      flipColor 2s cubic-bezier(.4, 0, .6, 0) infinite both 1s
    ;
  }
}

.page-backdrop {
  position: absolute;
  z-index: 2;
  top: $book-cover-padding;
  width: $book-width / 2 - $book-cover-padding;
  height: $book-height - $book-cover-padding * 2;
  background: #FFF;

  &.page-backdrop-left {
    left: $book-cover-padding;
    transform-origin: right center;
    transform: rotateY(30deg);
  }
  &.page-backdrop-right {
    right: $book-cover-padding;
    transform-origin: left center;
    transform: rotateY(-30deg);
  }
}
</style>
