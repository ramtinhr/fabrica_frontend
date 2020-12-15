<template>
  <div class="fabrica-container">
    <div class="advertise__create">
      <ValidationObserver ref="CreateAdForm" v-slot="{ passes }" tag="div">
        <form class="advertise__create-form" @submit.prevent="passes(createAd)">
          <div class="row">
            <div class="col-md-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="title"
                username="title"
                rules="required"
                class="form-group"
              >
                <label for="title">{{ $t('advertise.title') }}</label>
                <input
                  id="title"
                  v-model="title"
                  name="title"
                  type="text"
                  :placeholder="$t('advertise.title')"
                />
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4">
              <ValidationProvider
                v-slot="{ errors }"
                name="price"
                username="price"
                rules="required"
                tag="div"
                class="form-group"
              >
                <label for="price"
                  >{{ $t('advertise.price') }} ({{ $t('toman') }})
                </label>
                <input-number
                  id="price"
                  v-model="price"
                  :max-lenght="18"
                  :placeholder="$t('advertise.price')"
                  :name="'price'"
                  :type="'number'"
                  :number-format="false"
                />
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label for="priority">{{ $t('advertise.priority') }}</label>
                <v-select
                  id="priority"
                  v-model="selectedPriority"
                  :options="priority"
                  :placeholder="$t('home.selectPriority')"
                  label="title"
                  dir="rtl"
                >
                  <span slot="no-options"> {{ $t('noResultFound') }}</span>
                </v-select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label for="type">{{ $t('advertise.type') }}</label>
                <v-select
                  id="type"
                  v-model="selectedType"
                  :options="types"
                  :placeholder="$t('advertise.selectType')"
                  label="title"
                  dir="rtl"
                >
                  <span slot="no-options"> {{ $t('noResultFound') }}</span>
                </v-select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label for="state">{{ $t('list.selectState') }}</label>
                <v-select
                  id="state"
                  v-model="selectedState"
                  name="state"
                  :options="states"
                  :placeholder="$t('list.selectState')"
                  label="title"
                  dir="rtl"
                >
                  <span slot="no-options">
                    {{ $t('noResultFound') }}
                  </span>
                </v-select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label for="city">{{ $t('home.selectCity') }}</label>
                <v-select
                  id="city"
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
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="category">{{ $t('advertise.category') }}</label>
                <input
                  id="category"
                  v-model="searchString"
                  class="category-input"
                  :placeholder="
                    selectedCategory
                      ? selectedCategory.title
                      : $t('advertise.category')
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
                        v-if="categoriesBackup.length"
                        class="category-options"
                        @click="prevCat"
                      >
                        {{ $t('lastStep') }}
                        <i class="o-icon o-minimal-right"></i>
                      </li>
                      <li
                        v-for="(category, index) in categories"
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
                          :color="'#ccc'"
                          :size="'14px'"
                        />
                      </li>
                    </ul>
                  </transition>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label>{{ $t('advertise.abilityToSuggest') }}</label>
                <div class="switch-button">
                  <label class="switch">
                    <input
                      type="checkbox"
                      @click="
                        isPriceSuggestionEnabled = !isPriceSuggestionEnabled
                      "
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-if="selectedCategory" class="row m-t-10 m-b-10">
              <div class="col-xs-12 m-b-20">
                <div class="display-flex align-center">
                  <font-awesome-icon
                    :icon="['fas', 'exclamation-circle']"
                    class="text-warning font-size-20 m-l-5"
                  />
                  <span class="font-size-14 text-dimLightGray">{{
                    $t('advertise.warning')
                  }}</span>
                </div>
              </div>
              <div v-for="(img, i) in 5" :key="i" class="col-md-2">
                <TheUpload
                  :image-url="
                    images[i] ? images[i].url : '/images/add_image.png'
                  "
                  field="image"
                  :index="i"
                  :name="'advertiseImage'"
                  @getFile="getImage"
                />
              </div>
            </div>
          </transition>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="description">{{ $t('description') }}</label>
                <textarea
                  id="description"
                  v-model="description"
                  placeholder="متن خود را بنویسید..."
                  name=""
                  cols="30"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div class="col-xs-12">
              <div class="text-left">
                <button class="btn btn-fabrica">
                  {{ $t('advertise.submit') }}
                  <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CreateAdvertise',
  data() {
    return {
      isOpen: false,
      selectedCategory: null,
      selectedState: null,
      selectedCity: null,
      searchString: null,
      selectedType: null,
      selectedCategories: [],
      title: null,
      price: null,
      images: [],
      description: null,
      selectedPriority: null,
      isPriceSuggestionEnabled: false,
      cities: [],
      categories: [],
      categoriesBackup: [],
      isLoading: false,
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
      types: [
        {
          title: 'فروشی',
          key: 'sale',
        },
        {
          title: 'درخواستی',
          key: 'ask',
        },
        {
          title: 'اجاره',
          key: 'rent',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getResource']),
    states() {
      return this.getResource('advertise', 'states')
    },
  },
  watch: {
    selectedState(val) {
      if (val) {
        this.getCities()
      } else {
        this.selectedCity = null
      }
    },
  },
  created() {
    this.getState()
    this.getCategories()
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
    async selectCat(category, index) {
      this.categoriesBackup = this.categories
      if (!category.is_leaf) {
        this.categories[index].isLoading = true
        this.selectedCategories.push(category.id)
        await this.getCategories(category.id)
        this.categories[index].isLoading = false
      } else {
        this.selectedCategories.push(category.id)
        this.selectedCategory = category
        this.isOpen = false
      }
    },
    prevCat() {
      this.selectedCategories.pop()
      this.categories = this.categoriesBackup
      this.categoriesBackup = []
    },
    getImage(file, url, index) {
      if (!this.images[index]) {
        this.images.push({
          file,
          url,
        })
      } else {
        this.images.splice(index, 1)
        this.images.push({
          file,
          url,
        })
      }
    },
    getState() {
      this.$store.dispatch('get', {
        url: '/cities/state',
        storeName: 'advertise',
        resourceName: 'states',
      })
    },
    getCategories(id = null, q = null) {
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
          this.categories = resp.data.data
        })
    },
    getCities() {
      this.$store
        .dispatch('get', {
          url: '/cities',
          config: {
            params: {
              state: this.selectedState,
            },
          },
        })
        .then((resp) => {
          this.cities = resp.data.data
        })
    },
    onKeypressHandler(event) {
      if (event.key === 'Enter') {
        this.search()
      }
    },
    search() {
      this.getCategories(null, this.searchString)
    },
    autoSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.search()
      }, 600)
    },
    createAd() {
      const data = {
        title: this.title,
        description: this.description,
        ad_type: this.selectedType.key,
        category_ids: this.selectedCategories,
        images: this.images.map((img) => img.file),
        city_id: this.selectedCity._id,
        price: this.price,
        is_price_suggestion_enabled: this.isPriceSuggestionEnabled,
      }
      this.isLoading = true
      this.$store.dispatch('post', { url: '/ads', data }).then(() => {
        this.isLoading = false
        this.$toast.success(this.$t('advertise.success'))
        this.$router.push({ name: 'my-ads___' + this.$cookies.get('lang') })
      })
    },
  },
}
</script>
