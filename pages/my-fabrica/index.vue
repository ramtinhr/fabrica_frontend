<template>
  <MyFabricaProfile />
</template>

<script>
export default {
  layout: 'MyFabrica',
  name: 'Profile',
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('auth/fetchMe')
  },
}
</script>
