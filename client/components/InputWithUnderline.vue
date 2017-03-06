<!-- HTML -->
<template>
  <span class="input-with-underline">
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="update($event.target.value)"
    />
    <div class="border"></div>
    <icon
      class="icon"
      :class="{ spin: iconSpin }"
      :style="{ color: iconColor }"
      v-if="iconName"
      :size="iconSize"
      :name="iconName"
    />

  </span>
</template>


<!-- JAVASCRIPT -->
<script>
import icon from 'vue-icons/icon';


export default {
  name: 'input-with-underline',

  components: { icon },

  props: {
    value: String,
    placeholder: String,
    iconName: String,
    iconColor: {
      type: String,
      default: '#202020',
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    iconSpin: Boolean,
  },

  methods: {
    update(value) {
      this.$emit('input', value);
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

@keyframes spin {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.input-with-underline {
  position: relative;
  display: inline-block;
  width: 350px;
  max-width: 100%;
  border-bottom: 2px solid $lightgray;

  input {
    position: relative;
    z-index: 1;
    padding: 8px 2px;
    width: 100%;
    margin-right: 1.5rem;

    &:focus + .border {
      transform: scaleX(1);
    }
  }

  .border {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: $blue;
    transform: scaleX(0);
    transition: transform 300ms;
  }

  .icon {
    position: absolute;
    z-index: 2;
    right: 0.5rem;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    transform-origin: center center;

    &.spin {
      height: 19px !important; /* workaround for issue with spinning icons */
      animation: spin 1s infinite linear;
    }
  }

}
</style>
