<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div v-else>
    <MyFabricaProfile />
  </div>
</template>

<script>
export default {
  layout: 'MyFabrica',
  name: 'Profile',
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('auth/fetchMe')
  },
  data() {
    return {
      isLoading: true,
    }
  },
  created() {
    this.isLoading = true
  },
  beforeMount() {
    this.isLoading = false
  },
}
</script>
