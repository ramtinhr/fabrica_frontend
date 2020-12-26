<template>
  <div class="home__second-content">
    <div class="home__second-content-img hidden-xs hidden-sm"></div>
    <div v-if="isLoading" class="home__loading">
      <TheLoading :color="'#707070'" :size="'60px'" />
    </div>
    <div v-else class="fabrica-container">
      <div class="home__info">
        <div class="m-b-xs-20">
          <div class="home__info-title">
            <h2 class="font-size-24 text-dimGray">
              {{
                $t('advertise.theLatestFeaturesOfTheRoadConstructionCategory')
              }}
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
        <div
          v-for="advertise in advertises.data"
          :key="advertise.id"
          class="col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30"
        >
          <HorizontalAdvertise :advertise="advertise" />
        </div>
      </div>
      <div class="row justify-content-flex-end hidden-xs">
        <div
          v-for="advertise in advertises.data"
          :key="advertise.id"
          class="col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30"
        >
          <VerticalAdvertise :advertise="advertise" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeSecondContent',
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
      return this.getResource('home', 'secondAdvertises')
    },
  },
  created() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.isLoading = true
      this.id = this.categories.find(
        (category) => category.title === 'راه سازی'
      ).id
      this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'home',
          resourceName: 'secondAdvertises',
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
