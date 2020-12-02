<template>
  <div class="home__first-content">
    <div class="fabrica-container">
      <div class="row">
        <advertise
          v-for="advertise in advertises"
          :key="advertise.id"
          :img="advertise.image_url"
          :title="advertise.title"
          :price="advertise.price"
          :created-at="advertise.created_at_jalali_date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeFirstContent',
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
    advertises() {
      return this.getResource('home', 'firstAdvertises')
    },
  },
}
</script>
