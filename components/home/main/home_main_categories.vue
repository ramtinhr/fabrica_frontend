<template>
  <div class="home__main-categories col-xs-12">
    <ul>
      <li
        v-for="(category, i) in categories"
        :key="i"
        @click="selectCategory(category.id)"
      >
        <div
          :class="{
            'home__main-active-category': selectedCategory === category.id,
          }"
          class="p-v-20 border-radius-15"
        >
          <img :src="category.icon_image_url" alt="icon" />
          <p>{{ category.title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeMainCategories',
  data() {
    return {
      selectedCategory: null,
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('home', 'categories')
    },
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
      this.$store.commit('SELECT_CATEGORY', { category: this.selectedCategory })
      this.$store.dispatch('get', {
        url: '/categories',
        storeName: 'home',
        resourceName: 'parentCategories',
        config: {
          params: {
            parent_id: categoryId,
          },
        },
      })
    },
  },
}
</script>
