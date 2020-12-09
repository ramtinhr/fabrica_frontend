<template>
  <div class="home__first-content">
    <div class="home__first-content-img hidden-xs hidden-sm"></div>
    <div class="fabrica-container">
      <div class="home__info">
        <div class="m-b-xs-20">
          <div class="home__info-title">
            <span class="font-size-24 text-medium">
              {{ $t('advertise.theLatestFeaturesOfTheLightCarCategory') }}
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
  name: 'HomeFirstContent',
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
    advertises() {
      return this.getResource('home', 'firstAdvertises')
    },
  },
  methods: {
    onClickHandler() {
      const id = this.categories.find(
        (category) => category.title === 'خودرو سبک'
      ).id
      this.$emit('onClickHandler', id)
    },
  },
}
</script>
