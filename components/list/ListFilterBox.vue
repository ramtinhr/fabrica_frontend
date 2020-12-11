<template>
  <div class="col-md-3 col-sm-4 col-xs-12">
    <TheSidebar>
      <div slot="head">
        <div class="list__filter-box-head">
          <v-select
            v-model="selectedCategory"
            :options="categories"
            :placeholder="$t('home.selectSubCategory')"
            label="title"
            dir="rtl"
          >
            <span slot="no-options">
              {{ $t('noResultFound') }}
            </span>
          </v-select>
          <v-select
            v-model="selectedSubCategory"
            :options="subCategories"
            :placeholder="$t('home.selectSubCategory')"
            label="title"
            dir="rtl"
          >
            <span slot="no-options">
              {{
                selectedCategory
                  ? $t('noResultFound')
                  : $t('home.selectMainCategoryFirst')
              }}
            </span>
          </v-select>
        </div>
      </div>
      <div slot="body">
        <div class="list__filter-box-body">
          <h3 class="m-b-20">
            {{ $t('filters') }}
          </h3>
          <span class="font-size-14">
            {{ $t('priceRange') }}
          </span>
          <span class="font-size-12 text-dimLightGray">
            ({{ $t('toman') }})
          </span>
          <div class="m-t-10 m-b-10">
            <vue-slider
              ref="slider"
              v-model="value"
              v-bind="options"
            ></vue-slider>
          </div>
          <v-select
            v-model="selectedState"
            :options="states"
            :placeholder="$t('list.selectState')"
            label="title"
            dir="rtl"
          >
            <span slot="no-options">
              {{ $t('noResultFound') }}
            </span>
          </v-select>
          <v-select
            v-model="selectedCity"
            :options="cities"
            :placeholder="$t('home.selectCity')"
            label="title"
            dir="rtl"
          >
            <span slot="no-options">
              {{
                selectedState
                  ? $t('noResultFound')
                  : $t('home.selectStateFirst')
              }}
            </span>
          </v-select>
          <div class="list__filter-box-actions">
            <button class="btn btn-fabrica" @click="getFilteredData">
              {{ $t('list.setFilters') }}
              <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
            </button>
            <button class="btn btn-secondary" @click="resetFilters">
              {{ $t('list.cancelFilters') }}
              <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
            </button>
          </div>
        </div>
      </div>
    </TheSidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-slider-component/theme/default.css'
export default {
  name: 'ListFilterBox',
  data() {
    return {
      selectedCategory: null,
      selectedState: null,
      selectedSubCategory: null,
      selectedCity: null,
      cities: [],
      subCategories: [],
      value: [null, null],
      isLoading: false,
      options: {
        eventType: 'auto',
        width: 'auto',
        height: 5,
        dotSize: 16,
        min: 0,
        max: 1000000,
        minRange: 1000,
        maxRange: 1000000,
        interval: 1,
        show: true,
        speed: 1,
        tooltipDir: 'bottom',
        tooltipStyle: {
          backgroundColor: '#f2c200',
          borderColor: '#f2c200',
          color: '#707070',
        },
        processStyle: {
          backgroundColor: '#f2c200',
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    categories() {
      return this.getResource('list', 'categories')
    },
    states() {
      return this.getResource('home', 'states')
    },
  },
  watch: {
    selectedCategory(val) {
      if (val) {
        this.getSubCategories(val.id)
      } else {
        this.selectedCategory = null
      }
    },
    selectedState(val) {
      if (val) {
        this.getCities()
      } else {
        this.selectedCity = null
      }
    },
  },
  created() {
    this.getCategories()
    this.getState()
  },
  methods: {
    async getCategories() {
      await this.$store.dispatch('get', {
        storeName: 'list',
        resourceName: 'categories',
        url: '/categories',
        config: { params: { section: 'home' } },
      })
    },
    async getSubCategories(id) {
      await this.$store
        .dispatch('get', {
          url: '/categories',
          config: {
            params: {
              parent_id: id,
            },
          },
        })
        .then((resp) => (this.subCategories = resp.data.data))
    },
    async getState() {
      await this.$store.dispatch('get', {
        url: '/cities/state',
        storeName: 'home',
        resourceName: 'states',
      })
    },
    async getCities() {
      await this.$store
        .dispatch('get', {
          url: '/cities',
          config: {
            params: {
              state: this.selectedState,
            },
          },
        })
        .then((resp) => (this.cities = resp.data.data))
    },
    async getFilteredData() {
      if (
        !this.selectedCategory &&
        !this.selectedSubCategory &&
        !this.selectedCity &&
        !this.value[0]
      ) {
        return
      }
      this.isLoading = true
      const ids =
        this.selectedSubCategory || this.selectedCategory
          ? [this.selectedCategory.id, this.selectedSubCategory.id]
          : null
      const params = {
        limit: this.$store.getters.getLimit('list'),
        city_id: this.selectedCity ? this.selectedCity._id : null,
        category_ids: ids ? ids.join(',') : null,
        price_min: this.value[0] || null,
        price_max: this.value[1] || null,
      }
      await this.$router.push({
        query: {
          city: this.selectedCity ? this.selectedCity._id : null,
          category: this.selectedCategory.id || null,
          subCategory: this.selectedSubCategory.id || null,
          min: this.value[0] || null,
          max: this.value[1] || null,
        },
      })
      await this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'list',
          fillData: false,
          config: {
            params,
          },
        })
        .then(() => (this.isLoading = false))
    },
    async resetFilters() {
      this.value[0] = null
      this.value[1] = null
      this.selectedCity = null
      this.selectedCategory = null
      this.selectedSubCategory = null
      this.selectedState = null
      this.isLoading = true
      await this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'list',
          fillData: false,
          config: {
            params: {
              limit: this.$store.getters.getLimit('list'),
            },
          },
        })
        .then(() => (this.isLoading = false))
    },
  },
}
</script>
