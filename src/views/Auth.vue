<template>
  <div class="auth">
    <div class="auth__wrapper wrapper">
      <header class="auth__header">
        <img src="@/assets/images/main-logo.svg" alt="Daichi Air Solutions" />
      </header>
      <main class="auth__main">
        <div class="auth__formBlockOuter">
          <div class="auth__formBlockInner">
            <div id="recaptcha-container"></div>
            <button
              v-if="
                //stage === 'RegistrationForm' ||
                //stage === 'LoginForm' ||
                stage === 'PhoneCodeForm' || stage === 'EmailCodeForm'
              "
              class="auth__goBack"
              aria-label="Перейти назад"
              @click.prevent="goToStart"
            ></button>

            <form-loader v-if="isLoading" />

            <entrance-form v-if="stage === 'EntranceForm'" />
            <!-- <registration-form v-if="stage === 'RegistrationForm'" /> -->
            <!-- <login-form v-if="stage === 'LoginForm'" /> -->
            <phone-code-form v-if="stage === 'PhoneCodeForm'" />
            <email-code-form v-if="stage === 'EmailCodeForm'" />
            <!-- <password-reset-form v-if="stage === 'PasswordResetForm'" /> -->
          </div>
        </div>
      </main>
      <footer class="auth__footer">
        <span>© Daichi 2021. Все права защищены.</span>
        <a href="#" class="auth__footerRoolsLink">Правила и условия</a>
      </footer>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import FormLoader from '@/components/Auth/FormLoader'
import EntranceForm from '@/components/Auth/EntranceForm'
// import RegistrationForm from '@/components/Auth/RegistrationForm'
// import LoginForm from '@/components/Auth/LoginForm'
import PhoneCodeForm from '@/components/Auth/PhoneCodeForm'
import EmailCodeForm from '@/components/Auth/EmailCodeForm'
// import PasswordResetForm from '@/components/Auth/PasswordResetForm'
import {mutationTypes} from '@/store/modules/auth'

export default {
  name: 'Auth',
  components: {
    EntranceForm,
    FormLoader,
    // RegistrationForm,
    // LoginForm,
    PhoneCodeForm,
    EmailCodeForm,
    // PasswordResetForm,
  },
  computed: {
    ...mapState({
      stage: state => state.auth.stage,
      isLoading: state => state.auth.isLoading,
    }),
  },
  methods: {
    ...mapMutations({
      changeStage: mutationTypes.changeStage,
      changeError: mutationTypes.changeError,
    }),
    goToStart() {
      this.changeStage('EntranceForm')
      this.changeError('')
    },
  },
}
</script>
