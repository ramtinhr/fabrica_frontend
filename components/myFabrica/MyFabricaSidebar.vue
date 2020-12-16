<template>
  <div class="col-md-3 col-sm-4 col-xs-12">
    <TheSidebar>
      <div slot="head">
        <h4 class="m-b-20">
          {{ user.full_name }}
        </h4>
      </div>
      <div slot="body">
        <div class="my-fabrica__sidebar">
          <div class="my-fabrica__sidebar-avatar">
            <img v-if="user && user.avatar" :src="user.avatar" alt="آواتار" />
            <img v-else src="/images/avatar.jpg" alt="آواتار" />
          </div>
        </div>
        <div class="my-fabrica__sidebar-navs">
          <ul>
            <li>
              <nuxt-link
                :to="{ name: 'my-fabrica___' + $cookies.get('lang') }"
                active-class="active"
                tag="a"
              >
                <i class="o-icon o-circle-09 m-l-5"></i>
                {{ $t('myFabrica.editProfile') }}
              </nuxt-link>
            </li>
            <li>
              <i class="o-icon o-chat-33 m-l-5"></i>
              {{ $t('myFabrica.privateMessage') }}
            </li>
            <li>
              <i class="o-icon o-bookmark-2 m-l-5"></i>
              {{ $t('myFabrica.bookmarkedAdvertises') }}
            </li>
            <li>
              <nuxt-link
                :to="{ name: 'my-ads___' + $cookies.get('lang') }"
                tag="a"
              >
                <i class="o-icon o-paper-2 m-l-5"></i>
                {{ $t('header.myAdvertises') }}
              </nuxt-link>
            </li>
            <li @click="logout">
              <i class="o-icon o-log-out m-l-5"></i>
              {{ $t('myFabrica.logout') }}
            </li>
          </ul>
        </div>
      </div>
    </TheSidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyfabricaSidebar',
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  methods: {
    async logout() {
      await this.$router.push({ name: 'index___' + this.$cookies.get('lang') })
      await this.$store.dispatch('auth/logout')
      await this.$store.commit('STORE_USER_INFO', [])
    },
  },
}
</script>
