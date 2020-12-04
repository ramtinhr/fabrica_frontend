<template>
  <modal :is-open="isOpen" @close="closeModal()">
    <div slot="body">
      <div class="auth">
        <div class="auth__mobile-img">
          <img src="images/smartphone.png" alt="smartphone" />
        </div>
        <div v-show="step === 1" class="auth__steps">
          <span class="font-size-18 font-sans-medium">
            {{ $t('auth.enterYourMobileNumber') }}
          </span>
          <span class="text-dimLightGray text-center font-size-14">
            {{ $t('auth.text') }}
          </span>
          <div class="auth__phone-number-box">
            <input-number
              :max-lenght="10"
              :name="'live_price'"
              :number-format="false"
              :placeholder="'912833341'"
              :type="'tel'"
            />
            <span>98+</span>
          </div>
          <button class="btn btn-fabrica" @click="sendOtp">
            {{ $t('auth.sendCode') }}
          </button>
        </div>
        <div v-show="step === 2" class="auth__steps">
          <span class="font-size-18 font-sans-medium">
            {{ $t('auth.InitialRegistration') }}
          </span>
          <span class="text-dimLightGray text-center font-size-14">
            {{ $t('auth.registerText') }}
          </span>
          <p
            class="font-size-14 text-center text-yellow cursor-pointer"
            @click="step = 1"
          >
            {{ $t('auth.changePhoneNumber') }}
          </p>
          <div class="auth__otp-code-box">
            <input
              id="inp1"
              v-model="inp1"
              class="auth__otp-input"
              type="number"
              min="0"
              max="9"
              @keydown="focusPrevious('inp1', $event)"
              @keypress="focusNext('inp2', $event)"
            />
            <input
              id="inp2"
              v-model="inp2"
              class="auth__otp-input"
              type="number"
              min="0"
              max="9"
              @keydown="focusPrevious('inp1', $event)"
              @keypress="focusNext('inp3', $event)"
            />
            <input
              id="inp3"
              v-model="inp3"
              class="auth__otp-input"
              type="number"
              min="0"
              max="9"
              @keydown="focusPrevious('inp2', $event)"
              @keypress="focusNext('inp4', $event)"
            />
            <input
              id="inp4"
              v-model="inp4"
              class="auth__otp-input"
              type="number"
              min="0"
              max="9"
              @keydown="focusPrevious('inp3', $event)"
              @keypress="focusNext('inp4', $event)"
            />
          </div>
          <div class="font-size-14 m-t-10 m-b-10">
            <span>{{ $t('auth.dontReceiveCode') }}</span>
            <span class="text-dimLightGray font-size-12">
              {{ $t('auth.resendCode') }}
            </span>
          </div>
          <button class="btn btn-fabrica p-h-50">
            {{ $t('auth.login') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'Auth',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: 1,
      otpCode: [],
      inp1: '',
      inp2: '',
      inp3: '',
      inp4: '',
    }
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.step = 1
      }
    },
    otpCode() {
      if (this.inp1) {
        this.otpCode.push(this.inp1)
      }
    },
  },
  methods: {
    focusNext(focusNode, e) {
      if (e.keyCode !== 46 || e.keyCode !== 8) {
        document.getElementById(focusNode).focus()
      }
    },
    focusPrevious(lastFocusNode, e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        e.target.value = ''
        document.getElementById(lastFocusNode).focus()
      }
    },
    sendOtp() {
      this.step = 2
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped></style>
