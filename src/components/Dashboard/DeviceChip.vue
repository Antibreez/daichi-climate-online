<template>
  <div class="device-chip" :class="type">
    <span class="device-chip__title">
      {{
        type === 'error-devices'
          ? 'Устройства с ошибками'
          : type === 'active-devices'
          ? 'Устройства с активной подпиской'
          : type === 'controllers'
          ? 'Контроллеры'
          : type === 'remotes'
          ? 'VRF пульты'
          : type === 'clouds'
          ? 'Облачные кондиционеры'
          : ''
      }}
    </span>
    <span class="device-chip__count">{{ count }}</span>
    <svg v-if="type === 'error-devices'">
      <use xlink:href="@/assets/images/sprite.svg#heart"></use>
    </svg>
    <svg v-if="type === 'active-devices'">
      <use xlink:href="@/assets/images/sprite.svg#wireless"></use>
    </svg>
    <svg v-if="type === 'controllers'">
      <use xlink:href="@/assets/images/sprite.svg#signal"></use>
    </svg>
    <svg v-if="type === 'remotes'">
      <use xlink:href="@/assets/images/sprite.svg#power"></use>
    </svg>
    <svg v-if="type === 'clouds'">
      <use xlink:href="@/assets/images/sprite.svg#cloud"></use>
    </svg>
    <span v-if="errors" class="device-chip__errors">{{ errors }}</span>
  </div>
</template>

<script>
export default {
  name: 'DeviceChip',
  props: {
    type: {
      type: String,
    },
    count: {
      type: Number,
    },
    errors: {
      type: Number,
    },
  },
}
</script>
