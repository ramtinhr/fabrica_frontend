<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div
    v-else-if="
      !isLoading && ($mq === 'xs' || $mq === 'sm') && advertises.length > 0
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
  <div v-else-if="advertises.length > 0" class="row hidden-xs">
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
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    advertises() {
      return this.getResource('myFabrica', 'bookmarked')
    },
  },
  created() {
    this.getAdvertises()
  },
  methods: {
    getAdvertises() {
      this.isLoading = true
      this.$store
        .dispatch('get', {
          url: '/ads/favorite',
          storeName: 'myFabrica',
          resourceName: 'bookmarked',
        })
        .then(() => (this.isLoading = false))
    },
  },
}
</script>
