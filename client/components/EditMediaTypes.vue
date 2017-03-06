<!-- HTML -->
<template>
  <div class="edit-media-types">
    <label>
      <input
        type="radio"
        name="media-types"
        value="print"
        :checked="value === 'print'"
        @change="update($event.target.value)"
      />
      Print
    </label>

    <label>
      <input
        type="radio"
        name="media-types"
        value="ebook"
        :checked="value === 'ebook'"
        @change="update($event.target.value)"
      />
      E-Book
    </label>

    <label>
      <input
        type="radio"
        name="media-types"
        value="audiobook"
        :checked="value === 'audiobook'"
        @change="update($event.target.value)"
      />
      Audiobook
    </label>

    <label>
      <input
        type="radio"
        name="media-types"
        value=""
        :checked="!value"
        @change="update($event.target.value)"
      />
      All
    </label>

    <div class="clearfix"></div>
  </div>
</template>


<!-- JAVASCRIPT -->
<script>
export default {
  name: 'edit-media-types',

  props: ['value'],

  methods: {
    update(val) {
      this.$emit('input', val);
    },
  },
};
</script>


<!-- STYLES -->
<style scoped lang="scss">
@import '../styles/variables';

.edit-media-types {
  label {
    margin-right: 2rem;
    font-size: 14px;
    font-weight: 400;
    float: left;
  }

  .clearfix {
    clear: both;
  }
}
</style>
