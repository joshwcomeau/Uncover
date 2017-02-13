<template>
  <button class="button">
    <icon
      class="icon"
      v-if="icon"
      :size="iconSize"
      :name="icon"
      :style="{ color: iconColor }"
    />
    <slot></slot>
  </button>
</template>

<script>
import icon from 'vue-icons/icon';

export default {
  name: 'button',
  components: { icon },

  props: {
    icon: String,
    iconSize: {
      type: Number,
      default: 16,
    },
    iconColor: {
      type: String,
      default: '#202020',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.button {
  background: $white;
  padding: 3px 16px;
  border-radius: 4px;
  border: none;
  border-left: 1px solid $lightgray;
  border-right: 1px solid $lightgray;
  border-bottom: 2px solid $gray;
}
</style>
