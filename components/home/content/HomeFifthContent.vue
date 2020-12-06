<template>
  <div class="home__fifth-content">
    <div class="home__fifth-content-img hidden-xs hidden-sm"></div>
    <div v-if="isLoading" class="home__loading">
      <TheLoading :color="'#707070'" :size="'60px'" />
    </div>
    <div v-else class="fabrica-container">
      <div class="home__info">
        <div class="m-b-xs-20">
          <div class="home__info-title">
            <span class="font-size-24 font-sans-medium">
              {{ $t('advertise.theLatestFeaturesOfTheMotorcycleCategory') }}
            </span>
          </div>
          <div class="home__info-count">
            <span class="text-dimLightGray font-size-16 m-l-10">
              {{ $t('advertise.numberOfActiveAds') }}
            </span>
            <span class="text-dimLightGray font-size-16">
              {{ advertises.count }}
              {{ $t('number') }}
            </span>
          </div>
        </div>
        <button class="btn btn-fabrica">
          {{ $t('seeMore') }}
        </button>
      </div>
      <div v-if="this.$mq === 'xs' || this.$mq === 'sm'" class="row">
        <HorizontalAdvertise
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :img="advertise.featured_image"
          :title="advertise.title"
          :price="advertise.price"
          :created-at="advertise.created_at_jalali_date"
        />
      </div>
      <div class="row hidden-xs">
        <VerticalAdvertise
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :img="advertise.featured_image"
          :title="advertise.title"
          :price="advertise.price"
          :created-at="advertise.created_at_jalali_date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeFifthContent',
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
    advertises() {
      return this.getResource('home', 'fifthAdvertises')
    },
  },
  created() {
    this.getAdvertises()
  },
  methods: {
    async getAdvertises() {
      this.isLoading = true
      const fifthId = this.categories.find(
        (category) => category.title === 'موتور سیکلت'
      ).id
      await this.$store
        .dispatch('get', {
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
        .then(() => (this.isLoading = false))
    },
  },
}
</script>
