<template>
  <modal :is-open="isOpen" @close="closeModal()">
    <div slot="body">
      <div class="auth">
        <div class="auth__mobile-img">
          <img src="images/smartphone.png" alt="smartphone" />
        </div>
        <ValidationObserver
          v-show="step === 1"
          ref="mobileNumberForm"
          v-slot="{ passes }"
        >
          <form class="auth__steps" @submit.prevent="passes(loginInit)">
            <span class="font-size-18 font-sans-medium">
              {{ $t('auth.enterYourMobileNumber') }}
            </span>
            <span class="text-dimLightGray text-center font-size-14">
              {{ $t('auth.text') }}
            </span>
            <div class="auth__phone-number-box">
              <ValidationProvider
                v-slot="{ errors }"
                name="mobile"
                username="mobile"
                rules="required|max:10"
              >
                <input-number
                  v-model="mobileNumber"
                  :name="'mobile'"
                  :max-lenght="10"
                  :number-format="false"
                  :placeholder="'912833341'"
                  :type="'tel'"
                />
                <span>98+</span>
                <div class="m-t-10">
                  <span v-if="errors[0]" class="text-danger">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
            </div>
            <button class="btn btn-fabrica" @click="sendOtp">
              {{ $t('auth.sendCode') }}
            </button>
          </form>
        </ValidationObserver>
        <ValidationObserver
          v-show="step === 2"
          ref="otpForm"
          v-slot="{ passes }"
        >
          <form class="auth__steps" @submit.prevent="passes(authenticate)">
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
              <otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator=""
                :num-inputs="4"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-complete="onCompleteHandler"
              />
            </div>
            <div class="font-size-14 m-t-10 m-b-30">
              <span>{{ $t('auth.dontReceiveCode') }}</span>
              <span class="text-dimLightGray font-size-12">
                {{ $t('auth.resendCode') }}
              </span>
            </div>
            <button class="btn btn-fabrica p-h-45">
              {{ $t('auth.login') }}
            </button>
          </form>
        </ValidationObserver>
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
      mobileNumber: null,
      otpCode: [],
    }
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.step = 1
      }
    },
  },
  methods: {
    sendOtp() {
      this.step = 2
    },
    closeModal() {
      this.$emit('closeModal')
    },
    onCompleteHandler() {},
  },
}
</script>

<style scoped></style>
