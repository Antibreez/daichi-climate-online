<template>
  <svg class="icon">
    <use :xlink:href="`${sprite}#${id}`"></use>
  </svg>
</template>

<script>
import sprite from '@/assets/images/sprite.svg'

export default {
  name: 'Icon',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      sprite,
    }
  },
}
</script>
