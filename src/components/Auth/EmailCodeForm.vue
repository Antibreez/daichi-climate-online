<template>
  <div class="formBlock">
    <form>
      <h2 class="formBlock__title">Вход через Email</h2>
      <p class="formBlock__desc">
        Мы отправили код подтверждения на Email<br />
        {{ email }}
      </p>
      <div>
        <div class="formBlock__controls">
          <app-input
            label="Код подтверждения"
            inputType="password"
            :onInput="onInput"
            :hasErrorMessage="true"
            iconType="password"
          />
          <app-button
            class="formBlock__button"
            :onClick="onClick"
            text="Войти"
            :disabled="password.trim() === '' || errorMessage.length > 0"
          ></app-button>

          <button
            class="formBlock__repeatBtn"
            @click.prevent="onRepeatClick"
            :disabled="!!true"
          >
            Получить код повторно
          </button>

          <span class="formBlock__repeateCodeValue" v-if="true">
            (через {{ codeTimer }} сек.)
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import appButton from '@/components/common/Button'
import appInput from '@/components/common/Input'
import {mapState, mapMutations, mapActions} from 'vuex'
import {mutationTypes, actionTypes} from '@/store/modules/auth'
//import codeCounter from '@/helpers/codeCounter'

export default {
  component: 'PhoneCondeForm',
  components: {
    appButton,
    appInput,
  },
  data() {
    return {
      password: '',
    }
  },
  computed: {
    ...mapState({
      errorMessage: state => state.auth.errorMessage,
      email: state => state.auth.email,
      codeTimer: state => state.auth.codeTimer,
    }),
  },
  methods: {
    ...mapMutations({
      changeError: mutationTypes.changeError,
    }),
    ...mapActions({
      phoneLogin: actionTypes.phoneLogin,
      entranceCheckPhone: actionTypes.entranceCheckPhone,
      codeTimerInit: actionTypes.codeTimerInit,
    }),
    onClick() {
      // this.phoneLogin(this.password).then(() => {
      //   this.$router.push({name: 'Home'})
      // })
      this.changeError('Введён неверный код')
    },
    onRepeatClick() {
      // this.entranceCheckPhone(this.phone).then(() => {
      //   codeCounter.start()
      //   this.codeTimerInit()
      // })
    },
    onInput(val) {
      this.password = val

      this.errorMessage && this.changeError('')
    },
  },
}
</script>
