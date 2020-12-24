<template>
  <div class="burger-menu">
    <transition v-if="isOpen" name="fade">
      <div id="overlay" class="burger-menu__overlay"></div>
    </transition>
    <transition name="burger-slide">
      <div v-if="isOpen" class="burger-menu__body">
        <div class="burger-menu__body-logo-box">
          <div class="burger-menu__body-logo-box-img">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
        <ul>
          <li>
            <nuxt-link :to="{ name: 'index___' + $cookies.get('lang') }">
              <i class="o-icon o-home-51 m-l-5"></i>
              {{ $t('header.mainPage') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list___' + $cookies.get('lang') }">
              <i class="o-icon o-paper-2 m-l-5"></i>
              {{ $t('header.latestAdvertises') }}
            </nuxt-link>
          </li>
          <li v-if="isAuthenticated || clientSideIsAuthenticated">
            <nuxt-link :to="{ name: 'my-ads___' + $cookies.get('lang') }">
              <i class="o-icon o-folder-user m-l-5"></i>
              {{ $t('header.myAdvertises') }}
            </nuxt-link>
          </li>
          <li @click="onClickHandler">
            <i class="o-icon o-single-01 m-l-5"></i>
            <span v-if="isAuthenticated || clientSideIsAuthenticated">
              {{ $t('header.myFabrica') }}
            </span>
            <span v-else>
              {{ $t('header.login') }} / {{ $t('header.register') }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <TheAuth
      :is-open.sync="isOpenModal"
      :is-create-button="false"
      @closeModal="isOpenModal = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BurgerMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpenModal: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      clientSideIsAuthenticated: 'auth/clientSideIsAuthenticated',
    }),
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    $route() {
      this.isOpen = false
      document.body.style.overflow = 'auto'
      this.close()
    },
  },
  mounted() {
    this.checkAndClose()
  },
  updated() {
    this.checkAndClose()
  },
  methods: {
    checkAndClose() {
      const burger = document.getElementById('overlay')
      window.onclick = (e) => {
        if (e.target === burger) {
          this.close()
        }
      }
    },
    onClickHandler() {
      if (!this.isAuthenticated && !this.clientSideIsAuthenticated) {
        this.isOpenModal = true
      } else {
        this.$router.push({ name: 'my-fabrica___' + this.$cookies.get('lang') })
      }
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
