<template>
  <div class="checkbox">
    <label>
      <input
        type="checkbox"
        :name="inputName"
        class="visually-hidden"
        :checked="isChecked"
        @change="changeHandler"
      />
      <span class="checkbox__box">
        <icon v-if="isChecked" id="check" class="checkbox__box-icon" />
      </span>
      <span class="checkbox__text">{{ text }}</span>
      <span class="checkbox__count">{{ count }}</span>
    </label>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon'

export default {
  name: 'Checkbox',
  components: {
    Icon,
  },
  props: {
    inputName: {
      type: String,
    },
    text: {
      type: String,
    },
    count: {
      type: Number,
    },
    isChecked: {
      type: Boolean,
    },
    onChange: {
      type: Function,
    },
  },
  methods: {
    changeHandler(e) {
      e.preventDefault()
      // const checked = e.target.checked

      this.onChange(this.inputName)
    },
  },
}
</script>
