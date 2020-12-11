<template>
  <div class="fabrica-container">
    <div class="advertise__create">
      <ValidationObserver
        ref="CreateAdForm"
        class="advertise__create-form"
        @submit.prevent="passes(createAd)"
      >
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
                name="title"
                type="text"
                :placeholder="$t('advertise.title')"
              />
              <span v-if="errors[0]" class="text-danger">
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
              <input
                id="price"
                type="text"
                :placeholder="$t('advertise.price')"
              />
              <span v-if="errors[0]" class="text-danger">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="col-md-4">
            <div class="form-group2">
              <label for="priorty">{{ $t('advertise.priority') }}</label>
              <v-select
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
          <!--          <div class="col-md-4">-->
          <!--            <div class="form-group cat-select">-->
          <!--              <div @click="openDropdown">-->
          <!--                {{-->
          <!--                  finalSubCatTitle ? finalSubCatTitle : $t('advertise.category')-->
          <!--                }}-->
          <!--              </div>-->
          <!--              <div class="relative">-->
          <!--                <transition name="slide-down">-->
          <!--                  <div v-show="isOpen" class="cat-dropdown">-->
          <!--                    <div v-if="catBackup.length" class="cats" @click="prevCat">-->
          <!--                      مرحله قبل <i class="o-icon o-minimal-right"></i>-->
          <!--                    </div>-->
          <!--                    <div-->
          <!--                      v-for="cat in categories"-->
          <!--                      class="cats"-->
          <!--                      @click="selectCat(cat)"-->
          <!--                    >-->
          <!--                      {{ cat.title }}-->
          <!--                      <i-->
          <!--                        v-if="cat.subs.length"-->
          <!--                        class="o-icon o-minimal-left"-->
          <!--                      ></i>-->
          <!--                    </div>-->
          <!--                  </div>-->
          <!--                </transition>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="col-xs-12">
            <div class="form-group">
              <label for="description">{{ $t('description') }}</label>
              <textarea
                id="description"
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
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
        </div>
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
      selectedSubCategory: null,
      selectedCity: null,
      cities: [],
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
  },
  methods: {
    openDropdown() {
      this.isOpen = true
    },
    async getState() {
      await this.$store.dispatch('get', {
        url: '/cities/state',
        storeName: 'advertise',
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
    createAd() {},
  },
}
</script>
