<template>
  <div class="home">
    <section id="main">
      <HomeMain />
    </section>
    <section id="first-content">
      <HomeFirstContent @onClickHandler="onClickHandler" />
    </section>
    <section id="second-content">
      <HomeSecondContent @onClickHandler="onClickHandler" />
    </section>
    <section id="third-content">
      <HomeThirdContent @onClickHandler="onClickHandler" />
    </section>
    <section id="fourth-content">
      <HomeFourthContent @onClickHandler="onClickHandler" />
    </section>
    <section id="fifth-content">
      <HomeFifthContent @onClickHandler="onClickHandler" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData({ store }) {
    if (!store.getters.getResource('home', 'categories').length) {
      await store.dispatch('get', {
        storeName: 'home',
        resourceName: 'categories',
        url: '/categories',
        config: { params: { section: 'home' } },
      })
    }
    if (!store.getters.getResource('home', 'states').length) {
      await store.dispatch('get', {
        url: '/cities/state',
        storeName: 'home',
        resourceName: 'states',
      })
    }
    const categories = store.getters.getResource('home', 'categories')
    const firstId = categories.find(
      (category) => category.title === 'خودرو سبک'
    ).id
    const secondId = categories.find(
      (category) => category.title === 'راه سازی'
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
  },
  methods: {
    onClickHandler(id) {
      this.$router.push({
        name: 'list___' + this.$cookies.get('lang'),
        query: {
          category: id,
        },
      })
    },
  },
}
</script>
