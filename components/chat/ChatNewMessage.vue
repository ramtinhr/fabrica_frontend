<template>
  <div class="chat__new-message">
    <input
      id="message"
      v-model="text"
      type="text"
      name="message"
      placeholder="متن پیام ....."
      @keypress="onKeypressHandler($event)"
    />
    <button class="btn btn-fabrica" @click="addMessage">
      <i class="o-icon o-send"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChatNewMessage',
  data() {
    return {
      text: null,
    }
  },
  methods: {
    onKeypressHandler(e) {
      if (e.key === 'Enter') {
        this.addMessage()
      }
    },
    addMessage() {
      const data = {
        chat_id: this.$route.params.id,
        text: this.text,
      }
      this.$store
        .dispatch('post', {
          url: '/chats/messages/new',
          data,
        })
        .then((resp) => {
          const { data } = resp.data
          const message = {
            is_user_own: true,
            text: this.text,
            created_at_jalali_date: this.$jalaliDateTime(data.created_at),
          }
          this.$store.commit('myFabrica/ADD_MESSAGE', message)
          this.text = null
        })
    },
  },
}
</script>
