<!-- HTML -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
export default {
  name: 'card',
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.card {
  background: $white;
  margin: 1.5rem 0;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.1);
  border-radius: 2px;
}

@media (max-width: $break-mobile) {
  .card {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }
}
</style>
