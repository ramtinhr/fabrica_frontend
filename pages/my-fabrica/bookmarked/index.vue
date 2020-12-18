<template>
  <div v-if="isLoading" class="my-fabrica__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <div v-else-if="!isLoading && ($mq === 'xs' || $mq === 'sm')" class="row">
    <HorizontalAdvertise
      v-for="advertise in advertises"
      :key="advertise.id"
      :is-list="true"
      :advertise="advertise"
    />
  </div>
  <div v-else class="row hidden-xs">
    <VerticalAdvertise
      v-for="advertise in advertises"
      :key="advertise.id"
      :is-list="true"
      :advertise="advertise"
    />
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
