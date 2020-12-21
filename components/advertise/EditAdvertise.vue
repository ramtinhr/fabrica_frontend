<template>
  <div class="fabrica-container">
    <div class="advertise__create">
      <ValidationObserver ref="editAdForm" v-slot="{ passes }" tag="div">
        <form class="advertise__create-form" @submit.prevent="passes(editAd)">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="title"
                username="title"
                rules="required"
                class="form-group"
                tag="div"
              >
                <label for="title">{{ $t('advertise.title') }}</label>
                <input
                  id="title"
                  v-model="advertise.title"
                  name="title"
                  type="text"
                  :placeholder="$t('advertise.title')"
                />
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
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
                  v-model="advertise.price"
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
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="priority"
                username="priority"
                rules="required"
                class="form-group2"
                tag="div"
              >
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
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="type"
                username="type"
                rules="required"
                class="form-group2"
              >
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
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="state"
                username="state"
                rules="required"
                class="form-group2"
                tag="div"
              >
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
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="city"
                username="city"
                rules="required"
                class="form-group2"
                tag="div"
              >
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
                <span class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <ValidationProvider
                v-slot="{ errors }"
                name="category"
                username="category"
                :rules="`${!selectedCategory ? 'required' : ''}`"
                class="form-group"
                tag="div"
              >
                <label for="category">{{ $t('advertise.category') }}</label>
                <input
                  id="category"
                  v-model="searchString"
                  class="category-input"
                  :placeholder="
                    selectedCategory
                      ? selectedCategory.title
                      : $t('list.selectCategory')
                  "
                  type="text"
                  @keypress="onKeypressHandler($event)"
                  @keyup="autoSearch"
                  @click="openDropdown"
                />
                <div class="position-relative">
                  <transition name="fade">
                    <ul v-show="isOpen" class="category-dropdown">
                      <transition name="slide">
                        <li
                          v-show="categoriesBackup.length > 0"
                          class="category-options"
                          @click="prevCat"
                        >
                          {{ $t('lastStep') }}
                          <i class="o-icon o-minimal-right"></i>
                        </li>
                      </transition>
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
                          :color="'#f2c200'"
                          :size="'18px'"
                        />
                      </li>
                    </ul>
                  </transition>
                </div>
                <span v-if="!selectedCategory" class="text-danger font-size-12">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="form-group">
                <label>{{ $t('advertise.abilityToSuggest') }}</label>
                <div class="switch-button">
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="advertise.is_price_suggestion_enabled"
                      @click="
                        advertise.is_price_suggestion_enabled = !advertise.is_price_suggestion_enabled
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
              <div
                v-for="(img, i) in 5"
                :key="i"
                class="col-md-2 col-sm-3 col-xs-4 m-b-sm-15 m-b-xs-15"
              >
                <TheUpload
                  :image-url="
                    images[i] ? images[i].url : '/images/add_image.png'
                  "
                  :field="`'image'-${img}`"
                  :object-fit="!!images[i]"
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
                  v-model="advertise.description"
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
  name: 'EditAdvertise',
  props: {
    advertise: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
      description: null,
      selectedPriority: {
        title: 'عادی',
        key: 'normal',
      },
      selectedType: null,
      searchString: null,
      selectedCategory: null,
      selectedCategories: [],
      selectedState: null,
      selectedCity: null,
      cities: [],
      categories: [],
      images: [],
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
    this.loadComplexData()
    this.getCategories()
    this.getState()
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
    loadComplexData() {
      if (this.advertise) {
        this.selectedType = this.types.find(
          (type) => type.key === this.advertise.ad_type
        )
        this.selectedState = this.advertise.city.state
        this.selectedCity = {
          title: this.advertise.city.title,
          id: this.advertise.city._id,
        }
        this.selectedCategory = this.advertise.categories[
          this.advertise.categories.length - 1
        ]
        if (this.advertise.images.length > 0) {
          this.advertise.images.forEach((img, i) => {
            this.images.push({
              url: this.advertise.image_urls[i],
              file: img,
            })
          })
        }
      }
    },
    async selectCat(category, index) {
      this.categoriesBackup.push(this.categories)
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
      this.categories = this.categoriesBackup[this.categoriesBackup.length - 1]
      this.categoriesBackup.pop()
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
    editAd() {
      if (this.selectedCategories.length === 0) {
        this.advertise.categories.forEach((category) => {
          this.selectedCategories.push(category.id)
        })
      }
      const data = {
        title: this.advertise.title,
        description: this.advertise.description,
        ad_type: this.selectedType.key,
        category_ids: this.selectedCategories,
        images: this.images.map((img) => img.file),
        price: this.advertise.price,
        city_id: this.selectedCity._id,
        is_price_suggestion_enabled: this.advertise.is_price_suggestion_enabled,
      }
      this.isLoading = true
      this.$store
        .dispatch('put', { url: `/ads/${this.$route.params.id}`, data })
        .then(() => {
          this.isLoading = false
          this.$toast.success(this.$t('advertise.editSuccess'))
          this.$router.push({ name: 'my-ads___' + this.$cookies.get('lang') })
        })
    },
  },
}
</script>
