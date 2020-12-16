<template>
  <div>
    <MyFabricaProfile />
  </div>
</template>

<script>
export default {
  layout: 'MyFabrica',
  name: 'Profile',
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('get', { url: '/users/me' }).then((resp) => {
      store.commit('auth/STORE_USER_INFO', resp.data.data)
    })
  },
}
</script>
