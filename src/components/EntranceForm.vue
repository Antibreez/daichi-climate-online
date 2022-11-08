<template>
  <div class="formBlock">
    <form>
      <img
        class="formBlock__icon"
        src="@/assets/images/app-logo.svg"
        alt="Daichi Climate Online"
      />
      <h2 class="formBlock__title">Войти в аккаунт</h2>
      <p class="formBlock__desc">
        Укажите E-mail или номер телефона для входа в&nbsp;аккаунт
      </p>
      <div>
        <div class="formBlock__controls">
          <app-input
            class="formBlock__input"
            label="Email или номер телефона"
            inputType="text"
            :onInput="onInput"
            :hasErrorMessage="true"
            :isPhoneEmailInput="true"
          />
          <app-button
            class="formBlock__button"
            :onClick="onClick"
            text="Продолжить"
            :disabled="entranceValue.trim() === '' || errorMessage.length > 1"
          ></app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import validation from '@/helpers/validation'
import appButton from '@/components/Button'
import appInput from '@/components/Input'
import {mutationTypes, actionTypes} from '@/store/modules/auth'
import {mapActions, mapMutations, mapState} from 'vuex'
import codeCounter from '@/helpers/codeCounter'

export default {
  name: 'EntranceControl',
  components: {
    appButton,
    appInput,
  },
  data() {
    return {
      entranceValue: '',
    }
  },
  computed: {
    ...mapState({
      errorMessage: state => state.auth.errorMessage,
      phone: state => state.auth.phone,
    }),
  },
  methods: {
    ...mapMutations({
      changeError: mutationTypes.changeError,
      entrancePhone: mutationTypes.entrancePhone,
    }),
    ...mapActions({
      entranceFindEmail: actionTypes.entranceFindEmail,
      entranceCheckPhone: actionTypes.entranceCheckPhone,
      codeTimerInit: actionTypes.codeTimerInit,
    }),
    onClick() {
      if (validation.email.isValid(this.entranceValue)) {
        this.entranceFindEmail(this.entranceValue)
      } else if (validation.phone.isValid(this.entranceValue)) {
        console.log(this.entranceValue, this.phone)

        if (!codeCounter.get()) {
          this.entranceCheckPhone(this.entranceValue).then(() => {
            codeCounter.start()
            this.codeTimerInit()
          })
        } else if (
          codeCounter.get() &&
          validation.phone.getProperValue(this.entranceValue) !== this.phone
        ) {
          this.entranceCheckPhone(this.entranceValue).then(() => {
            clearInterval(codeCounter.timer)
            codeCounter.start()
            this.codeTimerInit()
          })
        } else if (
          codeCounter.get() &&
          validation.phone.getProperValue(this.entranceValue) === this.phone
        ) {
          this.entrancePhone(this.entranceValue)
        }
      } else {
        this.changeError(validation.entranceErrorMessage)
      }
    },
    onInput(val) {
      this.entranceValue = val

      // if (val.trim() === '79' || val.trim() === '89' || val.trim() === '+79') {
      //   this.setPhoneMask('+7 (999) 999-99-99')
      // }

      // if (val === '') {
      //   this.setPhoneMask('')
      // }

      // console.log(val)

      this.errorMessage && this.changeError('')
    },
    // setPhoneMask(value) {
    //   this.phoneMask = value
    // },
  },
}
</script>
