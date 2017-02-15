<template>
  <button class="button" :class="[size, color, { 'no-border': noBorder }]">
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
    size: {
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: 'white',
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../constants/style-vars';

.button {
  border: none;
  border-radius: 4px;
  border-left: 1px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);
  border-bottom: 2px solid rgba(0,0,0,0.4);
  font-weight: 500;
  outline: none;
  cursor: pointer;

  &.white {
    background: $white;
  }

  &.teal {
    background: $teal;
    color: $white;
  }

  &.blue {
    background: $blue;
    color: $white;
  }

  &.purple {
    background: lighten($purple, 5%);
    color: $white;
  }

  &.medium {
    padding: 3px 16px;
    font-size: 12px;
  }

  &.large {
    padding: 12px 36px;
    font-size: 17px;
    border-bottom: 3px solid rgba(0,0,0,0.4);
    letter-spacing: -0.5px;
  }

  &.no-border {
    border: none !important;
  }
}
</style>
