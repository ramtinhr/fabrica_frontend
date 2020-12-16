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
              <img v-if="user && user.avatar" :src="user.avatar" alt="آواتار" />
              <img v-else src="/images/avatar.jpg" alt="آواتار" />
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
              <input
                id="name"
                v-model="user.first_name"
                type="text"
                name="name"
              />
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
                v-model="user.last_name"
                type="text"
                name="lastname"
              />
              <span class="text-danger font-size-12">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12"></div>
          <div class="col-md-6 col-sm-6 col-xs-12"></div>
          <div class="col-xs-12">
            <div class="text-left">
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
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  methods: {
    editProfile() {},
  },
}
</script>
