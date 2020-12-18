<template>
  <nuxt-link
    v-if="advertise"
    :to="{
      name: 'single-id___' + $cookies.get('lang'),
      params: { id: advertise.id },
    }"
    :class="
      isList
        ? 'col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30'
        : 'col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30'
    "
    tag="div"
  >
    <div class="advertise__horizontal">
      <div class="advertise__horizontal-img-wrapper">
        <transition name="fade">
          <img
            v-if="advertise.featured_image"
            v-show="isLoaded"
            :src="advertise.featured_image"
            alt="فابریکا"
            @load="onLoaded"
          />
          <img
            v-show="isLoaded"
            v-else
            src="/images/placeholder.png"
            alt="عکس جایگزین"
            @load="onLoaded"
          />
        </transition>
      </div>
      <div class="advertise__horizontal-content">
        <div class="advertise__content-title">
          <span class="font-size-14 text-medium">
            {{ $strLimit(advertise.title, 50) }}
          </span>
        </div>
        <div class="advertise__horizontal-content-detail">
          <div class="advertise__horizontal-content-detail-price">
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.price') }}
            </span>
            <span
              v-if="advertise.price !== 0"
              class="text-dimLightGray font-size-12"
            >
              {{ $numberFormat($decimalNumber(advertise.price)) }}
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
              {{ advertise.created_at_jalali_date }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'HorizontalAdvertise',
  props: {
    isList: {
      type: Boolean,
      default: false,
    },
    advertise: {
      type: Object,
      default: null,
    },
    isUserAd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  methods: {
    onLoaded() {
      this.isLoaded = true
    },
  },
}
</script>
