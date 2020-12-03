<template>
  <div class="home__first-content">
    <div class="fabrica-container">
      <div class="home__first-content-detail">
        <div>
          <div class="home__first-content-title">
            <span class="font-size-24 font-sans-medium">
              {{ $t('advertise.theLatestFeaturesOfTheLightCarCategory') }}
            </span>
          </div>
          <div class="home__first-content-count">
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
      <div class="row">
        <advertise
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :img="advertise.image_url"
          :title="advertise.title"
          :price="advertise.price"
          :created-at="advertise.created_at_jalali_date"
        />
      </div>
    </div>
    <div class="home__first-content-img"></div>
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
}
</script>
