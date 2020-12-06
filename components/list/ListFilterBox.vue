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
      value: [0, 20],
      options: {
        eventType: 'auto',
        width: 'auto',
        height: 5,
        dotSize: 16,
        min: 0,
        max: 1000000000,
        minRange: 100000,
        maxRange: 1000000000,
        interval: 1,
        show: true,
        speed: 1,
        tooltipDir: 'bottom',
        tooltipStyle: {
          backgroundColor: '#f2c200',
          borderColor: '#f2c200',
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
    subCategories() {
      return this.getResource('list', 'subCategories')
    },
  },
  watch: {
    selectedCategory(val) {
      if (val != null) {
        this.getSubCategories(val.id)
      }
    },
  },
  created() {
    this.getCategories()
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
      await this.$store.dispatch('get', {
        storeName: 'list',
        resourceName: 'subCategories',
        url: '/categories',
        config: {
          params: {
            parent_id: id,
          },
        },
      })
    },
  },
}
</script>

<style scoped></style>
