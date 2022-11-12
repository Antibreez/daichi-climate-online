<template>
  <button
    type="button"
    class="checkbox-button"
    :class="{checked: isChecked}"
    @click="onClick"
  >
    <span class="checkbox__box">
      <icon v-if="isChecked" id="check" class="checkbox__box-icon" />
    </span>
    <span class="checkbox__text">
      <span class="checkbox__text-name">{{ text }}</span>
      <span v-if="count" class="checkbox__text-count">Выбран {{ count }}</span>
    </span>
    <icon id="small-arrow" class="checkbox__arrow" />
  </button>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  name: 'CheckboxButton',
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
    },
    count: {
      type: Number,
    },
    isChecked: {
      type: Boolean,
    },
    onClick: {
      type: Function,
    },
  },
}
</script>
