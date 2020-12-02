<template>
  <div class="home__main-states-slide">
    <client-only>
      <swiper id="state-slide" :options="swiperOption">
        <swiper-slide v-for="(state, index) in states" :key="index">
          <div class="home__main-states-slide-back">
            <img :src="`/images/states/${index + 1}.png`" alt="ostan" />
            <span class="font-size-16 font-sans-bold">{{ state }}</span>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
    <div slot="button-next" class="swiper-button-next"></div>
    <div slot="button-prev" class="swiper-button-prev"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeStatesSlide',
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          991: {
            slidesPerView: 5,
          },
          767: {
            slidesPerView: 3,
          },
          425: {
            slidesPerView: 2,
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
    states() {
      return this.getResource('home', 'states')
    },
  },
}
</script>
