<!-- Template -->
<template>
  <span class="input-with-underline">
    <input type="text" :value="value" @input="update($event.target.value)" />
    <div class="border"></div>
    <icon
      class="icon"
      v-if="iconName"
      :size="iconSize"
      :name="iconName"
    />

  </span>
</template>


<!-- Logic -->
<script>
import icon from 'vue-icons/icon';


export default {
  name: 'input-with-underline',

  components: { icon },

  data() {
    return {
      iconStyle: {
        color: this.iconColor,
        width: `${this.iconSize}px`,
        height: `${this.iconSize}px`,
      },
    };
  },

  props: {
    value: String,
    iconName: String,
    iconColor: {
      type: String,
      default: '#202020',
    },
    iconSize: {
      type: Number,
      default: 16,
    },
  },

  methods: {
    update(value) {
      this.$emit('input', value);
    },
  },
};
</script>


<!-- Styles -->
<style scoped lang="scss">
@import '../constants/style-vars';

.input-with-underline {
  position: relative;
  display: inline-block;
  border-bottom: 2px solid $lightgray;

  input {
    position: relative;
    z-index: 1;
    padding: 8px 2px;
    width: 350px;
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
    background: $purple;
    transform: scaleX(0);
    transition: transform 300ms;
  }

  .icon {
    position: absolute;
    z-index: 2;
    right: 0.5rem;
    top: 0;
    bottom: 0;
  }

}
</style>
