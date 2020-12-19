<template>
  <nuxt-link
    v-if="advertise"
    :to="{
      name: 'single-id___' + $cookies.get('lang'),
      params: { id: advertise.id },
    }"
    :class="
      isList
        ? 'col-md-4 col-sm-6 col-xs-12 p-h-10 m-t-15 m-b-15 m-b-xs-30'
        : 'col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30'
    "
  >
    <div class="advertise__vertical">
      <div class="advertise__vertical-img-wrapper">
        <transition-group name="fade">
          <img
            v-if="advertise.featured_image"
            v-show="isLoaded"
            :key="advertise.featured_image"
            :src="advertise.featured_image"
            alt="فابریکا"
            @load="onLoaded"
          />
          <img
            v-else
            v-show="isLoaded"
            :key="'placeholder'"
            src="/images/placeholder.png"
            alt="عکس جایگزین"
            @load="onLoaded"
          />
        </transition-group>
      </div>
      <div class="advertise__vertical-content">
        <div class="advertise-content-title">
          <span class="font-size-14 text-medium">
            {{ $strLimit(advertise.title, 50) }}
          </span>
        </div>
        <div class="advertise__vertical-content-detail">
          <div
            v-if="advertise.ad_status"
            class="advertise__vertical-content-detail-status"
          >
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.status') }}
            </span>
            <span class="text-dimLightGray font-size-12">
              {{ advertise.ad_status }}
            </span>
          </div>
          <div class="advertise__vertical-content-detail-price">
            <span class="text-dimLightGray font-size-12">
              {{ $t('advertise.price') }}
            </span>
            <span
              v-if="advertise.price !== 0"
              class="text-dimLightGray font-size-12"
            >
              {{ $numberFormat($decimalNumber(advertise.price)) }}
              {{ $t('toman') }}
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
  name: 'VerticalAdvertise',
  props: {
    isList: {
      type: Boolean,
      default: false,
    },
    advertise: {
      type: Object,
      default: null,
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
