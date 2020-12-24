<template>
  <div>
    <input
      id="category"
      v-model="searchString"
      class="category-input"
      :placeholder="
        selectedCategory ? selectedCategory.title : $t('list.selectCategory')
      "
      type="text"
      @keypress="onKeypressHandler($event)"
      @keyup="autoSearch"
      @click="openDropdown"
    />
    <div class="position-relative">
      <transition name="fade">
        <ul v-show="isOpen" class="category-dropdown">
          <li
            v-show="categoriesBackup.length"
            class="category-options"
            @click="prevCat"
          >
            {{ $t('lastStep') }}
            <i class="o-icon o-minimal-right"></i>
          </li>
          <li v-if="!categories.length" class="category-options">
            {{ $t('home.selectMainCategoryFirst') }}
          </li>
          <li
            v-for="(category, index) in categories"
            v-else
            :key="category.id"
            class="category-options"
            @click="selectCat(category, index)"
          >
            {{ category.title }}
            <i
              v-if="!category.is_leaf && !category.isLoading"
              class="o-icon o-minimal-left"
            ></i>
            <TheLoading
              v-if="category.isLoading"
              :color="'#f2c200'"
              :size="'18px'"
            />
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesSelectBox',
  props: {
    categories: {
      type: Array,
      default: null,
    },
    selectedCategories: {
      type: Array,
      default: null,
    },
    categoriesBackup: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      searchString: null,
      isOpen: false,
      selectedCategory: null,
    }
  },
  mounted() {
    window.addEventListener('click', (e) => {
      const target = e.target.classList
      if (
        !target.contains('category-options') &&
        !target.contains('category-dropdown') &&
        !target.contains('category-input') &&
        !target.contains('o-minimal-left') &&
        !target.contains('o-minimal-right')
      ) {
        this.isOpen = false
      }
    })
  },
  methods: {
    openDropdown() {
      this.isOpen = true
    },
    onKeypressHandler(event) {
      if (event.key === 'Enter') {
        this.search()
      }
    },
    selectCat(category, index) {
      this.$emit('selectCat', category, index)
      if (category.is_leaf) {
        this.isOpen = false
        this.selectedCategory = category
      }
    },
    prevCat() {
      this.$emit('prevCat')
    },
    autoSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.search()
      }, 600)
    },
    search() {
      this.$emit('search', this.searchString)
    },
  },
}
</script>
