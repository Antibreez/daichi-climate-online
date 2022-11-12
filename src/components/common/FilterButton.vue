<template>
  <button type="button" class="filterButton" :class="{active: isActive}">
    <span class="filterButton__icon"><icon id="filter" /></span>
    <span>Фильтр</span>
  </button>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  name: 'FilterButton',
  components: {
    Icon,
  },
  props: {
    isActive: {
      type: Boolean,
    },
  },
}
</script>
