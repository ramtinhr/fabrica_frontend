<template>
  <div class="col-md-9 col-sm-8 col-xs-12">
    <div class="advertise__single-detail">
      <div class="advertise__single-detail-head">
        <h3>{{ advertise.title }}</h3>
        <div class="m-b-15">
          <span class="font-size-16 text-dimLightGray"
            >{{ $t('advertise.category') }}:</span
          >
          <span
            v-for="category in advertise.categories"
            :key="category.id"
            class="font-size-16 m-r-5 text-dimLightGray"
            >{{ category.title }}
          </span>
        </div>
      </div>
      <div class="advertise__single-detail-slide">
        <img
          v-if="!advertise.image_urls"
          src="/images/big_placeholder.png"
          alt="عکس جایگزین"
        />
        <client-only v-else>
          <swiper
            :options="swiperOption"
            :auto-update="true"
            :auto-destroy="true"
          >
            <swiper-slide
              v-for="(img, index) in advertise.image_urls"
              :key="index"
            >
              <img v-if="img" :src="img" alt="عکس آگهی" />
            </swiper-slide>
          </swiper>
        </client-only>
        <div slot="pagination" class="swiper-pagination"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="button-prev" class="swiper-button-prev"></div>
      </div>
    </div>
    <div class="advertise__single-description">
      <h3>{{ $t('advertise.description') }}</h3>
      <p v-if="advertise.description" class="text-dimLightGray">
        {{ advertise.description }}
      </p>
      <p v-else class="text-dimLightGray">
        {{ $t('advertise.emptyDescription') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SingleAdvertiseDetail',
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
        },
        breakpoints: {
          991: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 1,
          },
          340: {
            slidesPerView: 1,
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    advertise() {
      return this.getResource('advertise')
    },
  },
}
</script>
