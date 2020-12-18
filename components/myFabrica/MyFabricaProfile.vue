<template>
  <div class="my-fabrica__profile">
    <ValidationObserver ref="CreateAdForm" v-slot="{ passes }" tag="div">
      <form
        class="advertise__create-form"
        @submit.prevent="passes(editProfile)"
      >
        <div class="row">
          <div class="col-xs-12">
            <div class="my-fabrica__profile-avatar">
              <TheUpload
                :image-url="avatarUrl ? avatarUrl : '/images/avatar.jpg'"
                field="image"
                :index="i"
                :name="'advertiseImage'"
                @getFile="getImage"
              />
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="name"
              username="name"
              rules="required"
              class="form-group"
              tag="div"
            >
              <label for="name">{{ $t('myFabrica.name') }}</label>
              <input id="name" v-model="firstname" type="text" name="name" />
              <span class="text-danger font-size-12">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="lastname"
              username="lastname"
              rules="required"
              class="form-group"
              tag="div"
            >
              <label for="lastname">{{ $t('myFabrica.lastname') }}</label>
              <input
                id="lastname"
                v-model="lastname"
                type="text"
                name="lastname"
              />
              <span class="text-danger font-size-12">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="state"
              username="city"
              rules="required"
              class="form-group2"
              tag="div"
            >
              <v-select
                id="state"
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
              <span class="text-danger font-size-12">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <ValidationProvider
              v-slot="{ errors }"
              name="city"
              username="city"
              rules="required"
              class="form-group2"
              tag="div"
            >
              <v-select
                id="city"
                v-model="selectedCity"
                :options="cities"
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
          <div class="col-xs-12">
            <div class="text-left m-t-15">
              <button class="btn btn-fabrica">
                {{ $t('submit') }}
                <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyFabricaProfile',
  async fetch() {
    this.firstname = await this.user.first_name
    this.lastname = await this.user.last_name
    this.selectedState = await this.user.city.state
    this.selectedCity = {
      _id: await this.user.city._id,
      title: await this.user.city.title,
    }
    this.avatarUrl = await this.user.avatar_url
    this.avatar = await this.user.avatar
  },
  data() {
    return {
      states: [],
      cities: [],
      selectedState: null,
      selectedCity: null,
      avatarUrl: null,
      avatar: null,
      isLoading: false,
      firstname: null,
      lastname: null,
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  watch: {
    selectedState(val) {
      if (val) {
        this.getCities()
      }
    },
  },
  created() {
    this.getState()
  },
  methods: {
    getImage(file, url) {
      this.avatar = file
      this.avatarUrl = url
    },
    getState() {
      this.$store
        .dispatch('get', {
          url: '/cities/state',
          storeName: 'list',
          resourceName: 'states',
        })
        .then((resp) => (this.states = resp.data.data))
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
        .then((resp) => (this.cities = resp.data.data))
    },
    editProfile() {
      const data = {
        first_name: this.firstname,
        last_name: this.lastname,
        client: 'desktop',
        city_id: this.selectedCity._id,
        avatar: this.avatar,
      }
      this.isLoading = true
      this.$store.dispatch('put', { url: '/users', data }).then((resp) => {
        this.isLoading = false
        this.$store.commit('auth/UPDATE_USER_INFO', {
          first_name: this.firstname,
          last_name: this.lastname,
          full_name: `${this.firstname} ${this.lastname}`,
          avatar: this.avatar,
          avatar_url: this.avatarUrl,
          city: {
            _id: this.selectedState._id,
            state: this.selectedState,
            title: this.selectedCity.title,
          },
        })
        this.$message(resp)
      })
    },
  },
}
</script>
