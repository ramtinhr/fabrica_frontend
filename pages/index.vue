<template>
  <div class="home">
    <home-states-picker />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  asyncData({ store }) {
    return store
      .dispatch('get', {
        url: 'https://api.fabrica.ir/categories',
        config: { params: { section: 'home' } },
      })
      .then((resp) => {
        store.commit('FILL', { storeName: 'categories', data: resp.data.data })
      })
  },
}
</script>
