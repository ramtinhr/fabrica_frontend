<template>
  <div class="advertise__single">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div class="p-v-50">
        <div class="row">
          <SingleAdvertiseSidebar />
          <SingleAdvertiseDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Advertise',
  async asyncData({ store, route, app }) {
    await store.dispatch('get', {
      url: `/ads/${route.params.id}`,
      storeName: 'advertise',
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
  computed: {
    ...mapGetters(['getResource']),
    advertise() {
      return this.getResource('advertise')
    },
  },
  created() {
    this.getAdvertiseTitle()
  },
  methods: {
    getAdvertiseTitle() {
      this.navs.push({
        title: this.advertise.title,
        link: '',
        color: 'lightgray',
      })
    },
  },
}
</script>
