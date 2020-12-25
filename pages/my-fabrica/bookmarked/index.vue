<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div
    v-else-if="
      !isLoading && ($mq === 'xs' || $mq === 'sm') && advertises.length
    "
    id="MobileList"
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
  <div v-else-if="advertises.length" id="list" class="row hidden-xs">
    <div
      v-for="advertise in advertises"
      :key="advertise.id"
      class="col-md-4 col-sm-6 col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30"
    >
      <VerticalAdvertise :advertise="advertise" />
    </div>
    <div class="col-xs-12">
      <div v-if="isDataLoading" class="text-center">
        <TheLoading :color="'#707070'" :size="'40px'" />
      </div>
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
  async created() {
    await this.getAdvertises()
  },
  updated() {
    this.lazyLoad()
  },
  methods: {
    lazyLoad() {
      const list = document.getElementById('my-fabrica-content')
      if (list) {
        window.onscroll = () => {
          if (window.innerHeight + window.scrollY + 200 >= list.scrollHeight) {
            if (this.advertises.length >= this.limit * this.page) {
              this.page++
              this.isDataLoading = true
              this.$store
                .dispatch('get', {
                  url: '/ads/favorite',
                  config: {
                    params: {
                      limit: this.limit,
                      page: this.page,
                    },
                  },
                })
                .then((resp) => {
                  this.$store.dispatch('add', {
                    storeName: 'myFabrica',
                    resourceName: 'bookmarked',
                    data: resp.data.data,
                  })
                  this.isDataLoading = false
                })
            }
          }
        }
      }
    },
    getAdvertises() {
      this.isLoading = true
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
          this.isLoading = false
        })
    },
  },
}
</script>
