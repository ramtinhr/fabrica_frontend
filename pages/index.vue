<template>
  <div class="home">
    <home-main />
    <home-first-content />
    <home-second-content />
    <home-third-content />
    <home-fourth-content />
    <home-fifth-content />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData({ store }) {
    await store.dispatch('get', {
      storeName: 'home',
      resourceName: 'categories',
      url: '/categories',
      config: { params: { section: 'home' } },
    })
    await store.dispatch('get', {
      url: '/cities/state',
      storeName: 'home',
      resourceName: 'states',
    })
    const categories = store.getters.getResource('home', 'categories')
    const firstId = categories.find(
      (category) => category.title === 'خودرو سبک'
    ).id
    const secondId = categories.find(
      (category) => category.title === 'راه سازی'
    ).id
    const thirdId = categories.find(
      (category) => category.title === 'خودرو سنگین'
    ).id
    const fourthId = categories.find(
      (category) => category.title === 'ضایعات و فلزات'
    ).id
    const fifthId = categories.find(
      (category) => category.title === 'موتور سیکلت'
    ).id
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'home',
      resourceName: 'firstAdvertises',
      fillData: false,
      config: {
        params: {
          category_ids: firstId,
          limit: 3,
        },
      },
    })
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'home',
      resourceName: 'secondAdvertises',
      fillData: false,
      config: {
        params: {
          category_ids: secondId,
          limit: 3,
        },
      },
    })
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'home',
      resourceName: 'thirdAdvertises',
      fillData: false,
      config: {
        params: {
          category_ids: thirdId,
          limit: 3,
        },
      },
    })
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'home',
      resourceName: 'fourthAdvertises',
      fillData: false,
      config: {
        params: {
          category_ids: fourthId,
          limit: 3,
        },
      },
    })
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'home',
      resourceName: 'fifthAdvertises',
      fillData: false,
      config: {
        params: {
          category_ids: fifthId,
          limit: 3,
        },
      },
    })
  },
}
</script>
