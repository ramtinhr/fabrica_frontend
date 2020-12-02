<template>
  <div class="home">
    <home-main />
    <home-first-content />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData({ store }) {
    await store
      .dispatch('get', {
        url: 'https://api.fabrica.ir/categories',
        config: { params: { section: 'home' } },
      })
      .then((resp) => {
        store.commit('FILL', {
          storeName: 'home',
          resourceName: 'categories',
          data: resp.data.data,
        })
      })
    await store
      .dispatch('get', { url: 'https://api.fabrica.ir/cities/state' })
      .then((resp) => {
        store.commit('FILL', {
          storeName: 'home',
          resourceName: 'states',
          data: resp.data.data,
        })
      })
  },
}
</script>
