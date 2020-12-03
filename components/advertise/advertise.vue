<template>
  <div class="col-md-3 col-sm-6 col-xs-12 p-r-10 p-l-10">
    <div class="advertise">
      <div class="advertise__img-wrapper">
        <img v-if="img" :src="img" alt="آگهی" />
        <img v-else src="/images/placeholder.png" alt="آگهی" />
      </div>
      <div class="advertise__content">
        <div class="advertise__content-title">
          <span class="font-size-14 font-sans-medium">
            {{ $strLimit(title, 45) }}
          </span>
        </div>
        <div class="advertise__content-detail">
          <div class="advertise__content-detail-price">
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.price') }}
            </span>
            <span class="text-dimLightGray font-size-12">
              {{ $numberFormat($decimalNumber(price)) }}
            </span>
          </div>
          <div class="advertise__content-detail-created">
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
  name: 'Advertise',
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
