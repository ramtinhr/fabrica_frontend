<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div v-else-if="chats.length" class="chat">
    <ChatListTile v-for="chat in chats" :key="chat._id" :chat="chat" />
    <div v-if="isDataLoading" class="text-center m-t-20">
      <TheLoading :color="'#707070'" :size="'40px'" />
    </div>
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
      isDataLoading: false,
      page: 1,
      limit: 20,
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
  updated() {
    this.lazyLoad()
  },
  methods: {
    lazyLoad() {
      const list = document.getElementById('my-fabrica-content')
      if (list) {
        window.onscroll = () => {
          if (window.innerHeight + window.scrollY + 200 >= list.scrollHeight) {
            if (this.chats.length >= this.limit * this.page) {
              this.page++
              this.isDataLoading = true
              this.$store
                .dispatch('get', {
                  url: '/chats',
                  config: {
                    params: {
                      limit: this.limit,
                      page: this.page,
                    },
                  },
                })
                .then((resp) => {
                  this.$store.dispatch('add', {
                    storeName: 'myFabrica',
                    resourceName: 'chats',
                    data: resp.data.data,
                  })
                  this.isDataLoading = false
                })
            }
          }
        }
      }
    },
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
