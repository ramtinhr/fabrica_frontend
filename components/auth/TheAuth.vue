<template>
  <TheModal :is-open="isOpen" @close="closeModal()">
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
            <ValidationProvider
              v-slot="{ errors }"
              name="mobile"
              username="mobile"
              rules="required|max:10"
            >
              <div class="auth__phone-number-box">
                <InputNumber
                  v-model="mobileNumber"
                  :name="'mobile'"
                  :max-lenght="10"
                  :number-format="false"
                  :placeholder="'9128333410'"
                  :type="'tel'"
                />
                <label>98+</label>
              </div>
              <div>
                <span v-if="errors[0]" class="text-danger">{{
                  errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <button :disabled="isLoading" class="btn btn-fabrica m-t-30">
              {{ $t('auth.sendCode') }}
              <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
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
              <OtpInput
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
              <span
                class="text-dimLightGray font-size-12 cursor-pointer"
                @click="loginInit"
              >
                {{ $t('auth.resendCode') }}
              </span>
            </div>
            <button :disabled="isLoading" class="btn btn-fabrica p-h-45">
              {{ $t('auth.login') }}
              <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </TheModal>
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
      smsCode: null,
      isLoading: false,
    }
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.step = 1
      }
    },
    smsCode(val) {
      if (val && val.length === 4) {
        this.authenticate()
      }
    },
  },
  methods: {
    onCompleteHandler(value) {
      this.smsCode = value
    },
    async loginInit() {
      try {
        this.isLoading = true
        const response = await this.$store.dispatch('auth/loginInit', {
          mobileNumber: `0${this.mobileNumber}`,
        })
        if (response.data.message.status === 200) {
          this.step = 2
        }
        this.$message(response)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.isLoading = false
      }
    },
    async authenticate() {
      try {
        this.isLoading = true
        const response = await this.$store.dispatch('auth/authenticate', {
          code: this.smsCode,
        })
        this.$message(response)
        if (response.data.message.status === 1002) {
          this.isOpen = false
        }
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.isLoading = false
      }
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped></style>
