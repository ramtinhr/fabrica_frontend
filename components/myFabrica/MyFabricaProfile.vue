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
