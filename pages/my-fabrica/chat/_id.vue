<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div v-else class="chat__messages">
    <div id="chats" class="chat__messages-list">
      <div
        v-for="message in messages"
        :key="message._id"
        :class="{
          'justify-content-start': message.is_user_own,
          'justify-content-flex-end': !message.is_user_own,
        }"
        class="chat__messages-box"
      >
        <ChatMessageBubble :message="message" />
      </div>
    </div>
    <ChatNewMessage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'MyFabrica',
  name: 'Messages',
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('auth/fetchMe')
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    messages() {
      return this.getResource('myFabrica', 'messages')
    },
  },
  created() {
    this.getMessages()
  },
  mounted() {
    this.scrollToBottom()
    document.getElementsByClassName(
      'my-fabrica__content-template'
    )[0].style.paddingTop = 0
  },
  beforeDestroy() {
    document.getElementsByClassName(
      'my-fabrica__content-template'
    )[0].style.paddingTop = '20px'
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      const chats = document.getElementById('chats')
      if (chats) {
        chats.scrollTop = chats.scrollHeight
      }
    },
    getMessages() {
      this.isLoading = true
      this.$store
        .dispatch('get', {
          url: `/chats/${this.$route.params.id}/messages`,
        })
        .then((resp) => {
          this.$store.dispatch('fill', {
            storeName: 'myFabrica',
            resourceName: 'messages',
            data: resp.data.data.reverse(),
          })
          this.isLoading = false
        })
    },
  },
}
</script>
