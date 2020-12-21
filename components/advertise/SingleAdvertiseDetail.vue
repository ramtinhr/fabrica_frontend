<template>
  <div class="col-md-9 col-sm-8 col-xs-12 m-t-xs-10">
    <div class="advertise__single-detail">
      <div class="advertise__single-detail-head">
        <div v-if="isAuthenticated || clientSideIsAuthenticated">
          <h3>{{ advertise.title }}</h3>
          <font-awesome-icon
            v-if="advertise.is_favored || isFavorite"
            :icon="['fas', 'bookmark']"
            class="font-size-26"
            @click="toggleFavorite"
          />
          <img v-else src="/icons/bookmark.svg" @click="toggleFavorite" />
        </div>
        <h3 v-else>{{ advertise.title }}</h3>
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
      <div class="advertise__single-detail-slider">
        <img
          v-if="!advertise.image_urls"
          src="/images/big_placeholder.png"
          alt="عکس جایگزین"
        />
        <client-only v-else>
          <swiper ref="swiperTop" :options="swiperOption">
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
      <div
        v-if="advertise.image_urls"
        class="advertise__single-detail-slider-thumbs"
      >
        <client-only>
          <swiper
            ref="swiperThumbs"
            :options="swiperOptionThumbs"
            :auto-destroy="false"
            :delete-instance-on-destroy="false"
            :cleanup-styles-on-destroy="false"
          >
            <swiper-slide
              v-for="(img, index) in advertise.image_urls"
              :key="index"
            >
              <img :src="img" />
            </swiper-slide>
          </swiper>
        </client-only>
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
      isFavorite: false,
      swiperOption: {
        spaceBetween: 10,
        loop: true,
        effect: 'slide',
        loopedSlides: 3,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      swiperOptionThumbs: {
        spaceBetween: 20,
        slideToClickedSlide: true,
        touchRatio: 0.2,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        breakpoints: {
          1200: {
            slidesPerView: 8,
          },
          992: {
            slidesPerView: 5,
          },
          547: {
            slidesPerView: 4,
          },
          320: {
            slidesPerView: 3,
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'getResource',
      'isAuthenticated',
      'clientSideIsAuthenticated',
    ]),
    advertise() {
      return this.getResource('advertise')
    },
  },
  mounted() {
    if (this.advertise.image_urls) {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper
        const swiperThumbs = this.$refs.swiperThumbs.$swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.advertise.is_favored && !this.isFavorite) {
        this.$store
          .dispatch('post', {
            url: `/ads/${this.$route.params.id}/favorite`,
          })
          .then(() => (this.isFavorite = true))
      } else {
        this.$store
          .dispatch('delete', {
            url: `/ads/${this.$route.params.id}/favorite`,
          })
          .then(() => {
            this.isFavorite = false
            this.advertise.is_favored = false
          })
      }
    },
  },
}
</script>
