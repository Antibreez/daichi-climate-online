<template>
  <div class="filtersModal">
    <div class="filtersModal__overlay" @click="onClose"></div>
    <perfect-scrollbar class="filtersModal__body">
      <div class="filtersModal__header">
        <h3 class="filtersModal__title">Фильтры</h3>
        <button
          type="button"
          class="filtersModal__reset"
          @click="onReset"
          :disabled="isResetDisabled"
        >
          Сбросить
        </button>
        <button type="button" class="filtersModal__close" @click="onClose">
          <icon id="close" />
        </button>
      </div>
      <div class="filtersModal__content">
        <slot />
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  name: 'FiltersModal',
  components: {
    Icon,
  },
  props: {
    onClose: {
      type: Function,
    },
    onReset: {
      type: Function,
    },
    isResetDisabled: {
      type: Boolean,
    },
  },
}
</script>
