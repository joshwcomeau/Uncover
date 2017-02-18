<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.card {
  background: $white;
  margin: 1.5rem 0;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.5);
  border-radius: 2px;
}
</style>
