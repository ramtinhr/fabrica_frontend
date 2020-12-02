<template>
  <div class="home__first-content"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFirstContent',
  data() {
    return {
      advertises: [],
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
  },
  async created() {
    await this.getAdvertises()
    console.log(this.advertises)
  },
  methods: {
    getAdvertises() {
      this.$store
        .dispatch('get', {
          url: '/ads/search',
          config: {
            params: {
              category_ids: this.categories.find(
                (category) => category.title === 'خودرو سنگین'
              ).id,
              limit: 3,
            },
          },
        })
        .then((resp) => {
          this.advertises = resp.data.data
        })
    },
  },
}
</script>
