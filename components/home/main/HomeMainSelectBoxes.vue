<template>
  <div class="home__main-select-boxes">
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12 m-b-xs-15 m-b-sm-15">
        <v-select
          v-model="selectedSubCategory"
          :options="categories"
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
      selectedSubCategory: null,
      selectedOrder: null,
      selectedCity: null,
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
    selectedSubCategory(val) {
      if (val != null) {
        this.$store.commit('SELECT_SUBCATEGORY', { subCategory: val.id })
      }
    },
    selectedCity(val) {
      if (val != null) {
        this.$store.commit('SELECT_CITY', val.id)
      }
    },
    selectedOrder(val) {
      if (val != null) {
        this.$store.commit('SELECT_ORDER', val.key)
      }
    },
  },
}
</script>
