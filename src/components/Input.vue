<template>
  <div class="input" :class="{invalid: isInvalid}">
    <label :class="{isEmpty: isEmpty}">{{ label }}</label>
    <input
      :type="inputType ? inputType : 'text'"
      @input="inputHandler"
      v-model="value"
      @focus="isEmpty = false"
      @blur="onBlur"
      ref="input"
    />
    <p class="input__message" v-if="hasErrorMessage && isInvalid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Inputmask from 'inputmask'

export default {
  name: 'appInput',
  props: {
    label: {
      type: String,
    },
    inputType: {
      type: String,
    },
    onInput: {
      type: Function,
    },
    hasErrorMessage: {
      type: Boolean,
    },
    isPhoneEmailInput: {
      type: Boolean,
    },
    // phoneMask: {
    //   type: String,
    // },
  },
  data() {
    return {
      isEmpty: true,
      value: '',
      im: new Inputmask('+7 (999) 999-99-99'),
    }
  },
  // watch: {
  //   phoneMask() {
  //     this.removePhoneMask()

  //     if (this.phoneMask) {
  //       if (
  //         this.value === '89' ||
  //         this.value === '79' ||
  //         this.value === '+79'
  //       ) {
  //         this.setValue(9)
  //       }
  //       this.setPhoneMask()
  //     }
  //   },
  // },
  computed: {
    ...mapState({
      errorMessage: state => state.auth.errorMessage,
      isInvalid: state => !!state.auth.errorMessage,
    }),
    // im() {
    //   console.log(this.value)
    //   console.log(this.phoneMask)
    //   return new Inputmask(this.phoneMask)
    // },
  },
  methods: {
    setValue(val) {
      this.value = val
    },
    inputHandler(e) {
      const val = e.target.value

      if (this.isPhoneEmailInput) {
        if (val === '89' || val === '79' || val === '+79') {
          this.setValue('9')
          this.setPhoneMask()
        }

        if (val === '') {
          this.removePhoneMask()
        }
      }

      console.log(e.target.value)
      this.onInput(e.target.value)
    },
    onBlur() {
      console.log(this.value)
      if (this.value.trim() === '') {
        this.isEmpty = true
      }
    },
    setPhoneMask() {
      this.im.mask(this.$refs.input)
    },
    removePhoneMask() {
      if (this.$refs.input.inputmask) {
        this.$refs.input.inputmask.remove()
      }
    },
  },
  // mounted() {
  //   if (this.phoneMask) {
  //     this.setPhoneMask()
  //   }
  // },
}
</script>
