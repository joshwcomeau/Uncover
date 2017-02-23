<!-- HTML -->
<template>
  <button
    class="button"
    :class="[size, color, { 'has-icon': !!icon, disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <icon
      class="icon"
      v-if="icon"
      :size="iconSize"
      :name="icon"
      :style="{
        color: iconColor,
        width: iconSize + 'px',
        height: iconSize + 'px',
      }"
    />
    <slot></slot>
  </button>
</template>


<!-- JAVASCRIPT -->
<script>
import icon from 'vue-icons/icon';

export default {
  name: 'button',
  components: { icon },

  props: {
    disabled: Boolean,
    handleClick: {
      type: Function,
      default() { /* noop */ },
    },
    icon: String,
    iconColor: {
      type: String,
      default: '#202020',
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    size: {
      type: String,
      default: 'medium',
    },
    color: {
      type: String,
      default: 'white',
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.button {
  position: relative;
  border: none;
  border-radius: 4px;
  border-left: 1px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);
  border-bottom: 2px solid rgba(0,0,0,0.4);
  font-weight: 500;
  outline: none;

  &.disabled {
    background-color: $gray !important;
    text-shadow: 1px 1px 1px darken($gray, 10%) !important;
  }

  &.white {
    background: $white;
  }

  &.teal {
    background: $teal;
    color: $white;
    text-shadow: 1px 1px 1px $teal;
    transition: background 300ms;

    &:hover {
      background: lighten($teal, 5%);
    }
  }

  &.blue {
    background: $blue;
    color: $white;
    text-shadow: 1px 1px 1px $blue;
    transition: background 300ms;

    &:hover {
      background: lighten($blue, 5%);
    }
  }

  &.purple {
    background: $purple;
    color: $white;
    text-shadow: 1px 1px 1px $purple;
    transition: background 300ms;

    &:hover {
      background: lighten($purple, 5%);
    }
  }

  &.red {
    background: $red;
    color: $white;
    text-shadow: 1px 1px 1px $red;
    transition: background 300ms;

    &:hover {
      background: lighten($red, 5%);
    }
  }

  &.medium {
    padding: 5px 16px;
    font-size: 12px;
  }

  &.large {
    padding: 12px 36px;
    font-size: 17px;
    border-bottom: 3px solid rgba(0,0,0,0.4);
    letter-spacing: -0.5px;
  }

  &.has-icon {
    padding-left: 32px;
  }

  .icon {
    position: absolute;
    top: 0;
    left: 8px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
