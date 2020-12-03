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
    const categories = store.getters.getResource('home', 'categories')
    const id = categories.find((category) => category.title === 'خودرو سنگین')
      .id
    await store
      .dispatch('get', {
        url: 'https://api.fabrica.ir/ads/search',
        config: {
          params: {
            category_ids: id,
            limit: 3,
          },
        },
      })
      .then((resp) => {
        store.commit('FILL', {
          storeName: 'home',
          resourceName: 'firstAdvertises',
          data: resp.data,
        })
      })
  },
}
</script>
