<template>
  <div class="home__main-states-slide">
    <client-only>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(state, index) in states" :key="index">
          <div
            class="home__main-states-slide-back"
            :class="{
              'home__main-states-slide-active': selectedState === state,
            }"
            @click="setState(state)"
          >
            <img :src="`/images/states/${index + 1}.png`" alt="استان" />
            <span class="font-size-16 text-bold">{{ state }}</span>
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
      selectedState: null,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    states() {
      return this.getResource('home', 'states')
    },
  },
  methods: {
    setState(state) {
      this.selectedState = state
      this.$store.commit('SELECT_STATE', { state })
      this.$store.dispatch('get', {
        url: '/cities',
        storeName: 'home',
        resourceName: 'cities',
        config: {
          params: {
            state,
          },
        },
      })
    },
  },
}
</script>
