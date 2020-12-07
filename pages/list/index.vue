<template>
  <div class="list">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div class="p-t-50">
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
  async asyncData({ store }) {
    await store.dispatch('get', {
      url: '/ads/search',
      storeName: 'list',
      fillData: false,
      config: {
        params: {
          limit: 21,
        },
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
