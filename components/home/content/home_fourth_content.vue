<template>
  <div class="home__fourth-content">
    <div class="home__fourth-content-img hidden-xs hidden-sm"></div>
    <div class="fabrica-container">
      <div class="home__info">
        <div class="m-b-xs-20">
          <div class="home__info-title">
            <span class="font-size-24 font-sans-medium text-dimGray">
              {{ $t('advertise.theLatestFeaturesOfScrapSndMetalsCategory') }}
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
      <div class="row justify-content-flex-end">
        <advertise-vertical
          v-for="advertise in advertises.data"
          :key="advertise.id"
          :img="advertise.featured_image"
          :title="advertise.title"
          :price="advertise.price"
          :created-at="advertise.created_at_jalali_date"
          class="m-b-xs-30"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeFourthContent',
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
    advertises() {
      return this.getResource('home', 'fourthAdvertises')
    },
  },
}
</script>
