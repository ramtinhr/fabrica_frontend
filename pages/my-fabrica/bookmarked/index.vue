<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div
    v-else-if="
      !isLoading && ($mq === 'xs' || $mq === 'sm') && advertises.length
    "
    class="row"
  >
    <div
      v-for="advertise in advertises"
      :key="advertise.id"
      class="col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30"
    >
      <HorizontalAdvertise :advertise="advertise" />
    </div>
  </div>
  <div v-else-if="advertises.length" class="row hidden-xs">
    <div
      v-for="advertise in advertises"
      :key="advertise.id"
      class="col-md-4 col-sm-6 col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30"
    >
      <VerticalAdvertise :advertise="advertise" />
    </div>
  </div>
  <div v-else class="row">
    <EmptyData />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'MyFabrica',
  name: 'Bookmarked',
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('auth/fetchMe')
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 20,
      isDataLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    advertises() {
      return this.getResource('myFabrica', 'bookmarked')
    },
  },
  created() {
    this.getAdvertises(true)
  },
  mounted() {
    this.lazyLoad()
  },
  methods: {
    lazyLoad() {
      const list = document.getElementById('my-fabrica__content')
      if (list) {
        window.onscroll = () => {
          if (window.innerHeight + window.scrollY + 200 >= list.scrollHeight) {
            if (this.advertises.length >= this.limit * this.page) {
              this.page++
              this.getAdvertises()
            }
          }
        }
      }
    },
    getAdvertises(isLoading) {
      if (isLoading) {
        this.isLoading = true
      } else {
        this.isDataLoading = true
      }
      this.$store
        .dispatch('get', {
          url: '/ads/favorite',
          config: {
            params: {
              limit: this.limit,
              page: this.page,
            },
          },
          storeName: 'myFabrica',
          resourceName: 'bookmarked',
        })
        .then(() => {
          if (isLoading) {
            this.isLoading = false
          } else {
            this.isDataLoading = false
          }
        })
    },
  },
}
</script>
