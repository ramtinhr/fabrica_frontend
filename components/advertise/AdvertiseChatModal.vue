<template>
  <TheModal :is-open="isOpen" @close="closeModal()">
    <div slot="head">
      <div class="p-20">
        <span>{{ $t('advertise.sendMessage') }}</span>
      </div>
    </div>
    <div slot="body">
      <div class="advertise__chat">
        <ValidationObserver ref="messageForm" v-slot="{ passes }">
          <form @submit.prevent="passes(sendMessage)">
            <ValidationProvider
              v-slot="{ errors }"
              name="message"
              username="message"
              rules="required|min:5"
            >
              <div>
                <textarea
                  id="message"
                  v-model="text"
                  name="message"
                  cols="30"
                  rows="5"
                  :placeholder="$t('advertise.messageText')"
                ></textarea>
              </div>
              <div>
                <span v-if="errors[0]" class="text-danger font-size-14">{{
                  errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <div class="text-center">
              <button :disabled="isLoading" class="btn btn-fabrica m-t-30">
                {{ $t('send') }}
                <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </TheModal>
</template>

<script>
export default {
  name: 'AdvertiseChatModal',
  props: {
    id: {
      type: String,
      default: null,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      text: null,
    }
  },
  methods: {
    sendMessage() {
      const data = {
        ad_id: this.id,
        text: this.text,
      }
      this.isLoading = true
      this.$store
        .dispatch('post', {
          url: '/chats/messages/new',
          data,
        })
        .then(() => {
          this.isLoading = false
          this.isOpen = false
          this.$toast.success('پیام با موفقیت ارسال شد')
        })
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
