<template>
  <div class="home__third-content">
    <div class="home__third-content-img hidden-xs hidden-sm"></div>
    <div v-if="isLoading" class="home__loading">
      <TheLoading :color="'#707070'" :size="'60px'" />
    </div>
    <div v-else class="fabrica-container">
      <div class="home__info">
        <div class="m-b-xs-20">
          <div class="home__info-title">
            <h2 class="font-size-24">
              {{ $t('advertise.theLatestFeaturesOfTheHeavyVehicleCategory') }}
            </h2>
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
        <button class="btn btn-fabrica" @click="onClickHandler">
          {{ $t('seeMore') }}
        </button>
      </div>
      <div v-if="this.$mq === 'xs' || this.$mq === 'sm'" class="row">
        <HorizontalAdvertise
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :advertise="advertise"
        />
      </div>
      <div class="row hidden-xs">
        <VerticalAdvertise
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :advertise="advertise"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeThirdContent',
  data() {
    return {
      isLoading: false,
      id: null,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
    advertises() {
      return this.getResource('home', 'thirdAdvertises')
    },
  },
  created() {
    this.getAdvertises()
  },
  methods: {
    async getAdvertises() {
      this.isLoading = true
      this.id = this.categories.find(
        (category) => category.title === 'خودرو سنگین'
      ).id
      await this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'home',
          resourceName: 'thirdAdvertises',
          fillData: false,
          config: {
            params: {
              category_ids: this.id,
              limit: 3,
            },
          },
        })
        .then(() => (this.isLoading = false))
    },
    onClickHandler() {
      this.$emit('onClickHandler', this.id)
    },
  },
}
</script>
