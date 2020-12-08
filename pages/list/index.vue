<template>
  <div class="list">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div class="p-v-50">
        <div class="row">
          <ListFilterBox />
          <AdvertiseList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  async asyncData({ store, route }) {
    const query = route.query
    const ids =
      query.category && query.subCategory
        ? [query.category, query.subCategory]
        : null
    const params = {
      limit: store.getters.getLimit('list'),
      q: query.q || null,
      sort: query.order || null,
      city_id: query.city || null,
      category_ids: ids ? ids.join(',') : null,
    }
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'list',
      fillData: false,
      config: {
        params,
      },
    })
  },
  data() {
    return {
      navs: [
        {
          title: this.$t('header.mainPage'),
          link: 'index',
        },
        {
          title: this.$t('header.latestAdvertises'),
          link: 'list',
        },
      ],
    }
  },
}
</script>
