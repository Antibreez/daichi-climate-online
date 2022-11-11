<template>
  <div class="search">
    <input
      ref="input"
      type="text"
      class="search__input"
      @input="onInput"
      v-model="searchValue"
    />
    <svg class="search__icon">
      <use xlink:href="@/assets/images/sprite.svg#search"></use>
    </svg>
    <button
      v-if="searchValue !== ''"
      type="button"
      class="search__clear-btn"
      @click="clearHandler"
    >
      <svg><use xlink:href="@/assets/images/sprite.svg#close"></use></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    onInput: {
      type: Function,
    },
    onClear: {
      type: Function,
    },
  },
  data() {
    return {
      searchValue: '',
    }
  },
  methods: {
    clearHandler() {
      this.$refs.input.value = ''
      this.searchValue = ''
      this.onClear && this.onClear()
    },
  },
}
</script>
