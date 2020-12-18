<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div v-else-if="chats.length > 0" class="chat">
    <ChatListTile v-for="chat in chats" :key="chat._id" :chat="chat" />
  </div>
  <div v-else class="row">
    <EmptyData />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'MyFabrica',
  name: 'Chat',
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
    chats() {
      return this.getResource('myFabrica', 'chats')
    },
  },
  created() {
    this.getChats()
  },
  methods: {
    getChats() {
      this.isLoading = true
      this.$store
        .dispatch('get', {
          url: '/chats',
          storeName: 'myFabrica',
          resourceName: 'chats',
        })
        .then(() => (this.isLoading = false))
    },
  },
}
</script>
