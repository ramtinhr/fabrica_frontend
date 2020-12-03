<template>
  <div class="home__main-categories col-xs-12">
    <ul>
      <li v-for="(category, i) in categories" :key="i">
        <img :src="category.icon_image_url" alt="icon" />
        <p>{{ category.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeMainCategories',
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
  },
}
</script>
