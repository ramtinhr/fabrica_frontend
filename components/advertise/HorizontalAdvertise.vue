<template>
  <div class="col-md-3 col-sm-4 col-xs-12 p-r-10 p-l-10">
    <div class="advertise__horizontal">
      <div class="advertise__horizontal-img-wrapper">
        <img v-if="img" :src="img" alt="آگهی" />
        <div v-else class="advertise__horizontal-img-placeholder"></div>
      </div>
      <div class="advertise__horizontal-content">
        <div class="advertise__content-title">
          <span class="font-size-14 font-sans-medium">
            {{ $strLimit(title, 45) }}
          </span>
        </div>
        <div class="advertise__horizontal-content-detail">
          <div class="advertise__horizontal-content-detail-price">
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.price') }}
            </span>
            <span v-if="price !== 0" class="text-dimLightGray font-size-12">
              {{ $numberFormat($decimalNumber(price)) }}
            </span>
            <span v-else class="text-dimLightGray font-size-12">
              {{ $t('advertise.call') }}
            </span>
          </div>
          <div class="advertise__horizontal-content-detail-created">
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.createdAt') }}
            </span>
            <span class="text-dimLightGray font-size-12">
              {{ createdAt }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalAdvertise',
  props: {
    img: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: String,
      default: null,
    },
  },
}
</script>
