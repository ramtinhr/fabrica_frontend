<template>
  <div
    :class="
      isListPage
        ? 'col-md-4 col-sm-6 col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30'
        : 'col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30'
    "
  >
    <div class="advertise__vertical">
      <div class="advertise__vertical-img-wrapper">
        <img v-if="img" :src="img" alt="فابریکا" />
        <img v-else src="/images/placeholder.png" alt="عکس جایگزین" />
      </div>
      <div class="advertise__vertical-content">
        <div class="advertise-content-title">
          <span class="font-size-14 font-sans-medium">
            {{ $strLimit(title, 45) }}
          </span>
        </div>
        <div class="advertise__vertical-content-detail">
          <div class="advertise__vertical-content-detail-price">
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
          <div class="advertise__vertical-content-detail-created">
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
  name: 'VerticalAdvertise',
  props: {
    isListPage: {
      type: Boolean,
      default: false,
    },
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
