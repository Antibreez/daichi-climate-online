<template>
  <div class="input" :class="{invalid: isInvalid}">
    <label :class="{isEmpty: isFocus ? false : value ? false : true}">{{ label }}</label>
    <input
      :class="iconType ? 'hasIcon' : null"
      :type="type ? type : 'text'"
      @input="inputHandler"
      v-model="value"
      @focus="isFocus = true"
      @blur="isFocus = false"
      ref="input"
    />
    <button v-if="iconType === 'password'" type="button" class="input__iconBtn" @click="onPasswordIconClick">
      <svg v-if="type === 'password'">
        <use xlink:href="@/assets/images/sprite.svg#show"></use>
      </svg>
      <svg v-if="type === 'text'">
        <use xlink:href="@/assets/images/sprite.svg#hide"></use>
      </svg>
    </button>
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
    iconType: {
      type: String,
    },
    inputValue: {
      type: String,
    },
    // phoneMask: {
    //   type: String,
    // },
  },
  data() {
    return {
      type: this.inputType,
      isFocus: false,
      value: this.inputValue ? this.inputValue : '',
      im: new Inputmask('+7 (999) 999-99-99', {
        showMaskOnHover: false,
        clearMaskOnLostFocus: false,
      }),
    }
  },
  watch: {
    inputValue() {
      this.value = this.inputValue !== null ? this.inputValue : this.value
    },
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
          //this.setValue('+7 (9')
        }

        if (val === '') {
          this.removePhoneMask()
        }
      }

      this.onInput(e.target.value)
    },
    setPhoneMask() {
      this.im.mask(this.$refs.input)
    },
    removePhoneMask() {
      if (this.$refs.input.inputmask) {
        this.$refs.input.inputmask.remove()
      }
    },
    onPasswordIconClick() {
      this.type === 'password' ? (this.type = 'text') : (this.type = 'password')
    },
  },
}
</script>
