<template>
  <button type="button" class="filterButton" :class="{active: isActive}">
    <svg><use xlink:href="@/assets/images/sprite.svg#filter"></use></svg>
    <span>Фильтр</span>
  </button>
</template>

<script>
export default {
  name: 'FilterButton',
  props: {
    isActive: {
      type: Boolean,
    },
  },
}
</script>
