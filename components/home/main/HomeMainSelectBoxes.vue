<template>
  <div class="home__main-select-boxes">
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12 m-b-xs-15 m-b-sm-15">
        <CategoriesSelectBox
          :categories="categories"
          :selected-categories="selectedCategories"
          :categories-backup="categoriesBackup"
          @search="search"
          @selectCat="selectCat"
          @prevCat="prevCat"
        />
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 m-b-xs-15 m-b-sm-15">
        <v-select
          v-model="selectedOrder"
          :options="orderBy"
          :placeholder="$t('orderBy')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 m-b-xs-15">
        <v-select
          :options="priority"
          :placeholder="$t('home.selectPriority')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <v-select
          v-model="selectedCity"
          :options="cities"
          :placeholder="$t('home.selectCity')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options">
            {{
              selectedState ? $t('noResultFound') : $t('home.selectStateFirst')
            }}
          </span>
        </v-select>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeMainSelectBoxes',
  data() {
    return {
      selectedOrder: null,
      selectedCity: null,
      searchString: null,
      categoriesBackup: [],
      selectedCategories: [],
      orderBy: [
        {
          title: 'صعودی قیمت',
          key: 'price_asc',
        },
        {
          title: 'نزولی قیمت',
          key: 'price_desc',
        },
        {
          title: 'صعودی تاریخ',
          key: 'created_at_asc',
        },
        {
          title: 'نزولی تاریخ',
          key: 'created_at_desc',
        },
      ],
      priority: [
        {
          title: 'عادی',
          key: 'normal',
        },
        {
          title: 'فوری',
          key: 'immediate',
        },
        {
          title: 'ویژه',
          key: 'special',
        },
        {
          title: 'ویژه فوری',
          key: 'immediate-special',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getResource', 'getSelectedCategory', 'getSelectedState']),
    categories() {
      return this.getResource('home', 'subCategories')
    },
    cities() {
      return this.getResource('home', 'cities')
    },
    selectedCategory() {
      return this.getSelectedCategory
    },
    selectedState() {
      return this.getSelectedState
    },
  },
  watch: {
    selectedCity(val) {
      if (val) {
        this.$store.commit('SELECT_CITY', { city: val._id })
      }
    },
    selectedOrder(val) {
      if (val) {
        this.$store.commit('SELECT_ORDER', { order: val.key })
      }
    },
  },
  beforeDestroy() {
    this.$store.dispatch('empty', {
      storeName: 'home',
      resourceName: 'subCategories',
    })
    this.$store.commit('SELECT_CITY', {
      storeName: 'home',
      resourceName: 'cities',
    })
  },
  methods: {
    search() {
      this.getCategories(null, this.searchString)
    },
    async selectCat(category, index) {
      if (!category.is_leaf) {
        this.categories[index].isLoading = true
        this.selectedCategories.push(category.id)
        await this.getCategories(category.id, null, true)
        this.categories[index].isLoading = false
      } else {
        if (
          this.selectedCategories.length ===
          this.categoriesBackup.length + 1
        ) {
          this.selectedCategories.pop()
        }
        this.selectedCategories.push(category.id)
      }
      this.$store.commit('SELECT_SUBCATEGORY', {
        subCategory: this.selectedCategories,
      })
    },
    getCategories(id = null, q = null, isBackup = false) {
      this.$store
        .dispatch('get', {
          url: '/categories',
          config: {
            params: {
              parent_id: id || null,
              section: id ? null : 'home',
              q: q || null,
            },
          },
        })
        .then((resp) => {
          if (isBackup) {
            this.categoriesBackup.push(this.categories)
          }
          this.$store.dispatch('fill', {
            storeName: 'home',
            resourceName: 'subCategories',
            data: resp.data.data,
          })
        })
    },
    prevCat() {
      this.selectedCategories.pop()
      this.$store.dispatch('fill', {
        storeName: 'home',
        resourceName: 'subCategories',
        data: this.categoriesBackup[this.categoriesBackup.length - 1],
      })
      this.categoriesBackup.pop()
    },
  },
}
</script>
