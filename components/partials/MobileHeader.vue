<template>
  <header class="header">
    <div class="fabrica-container">
      <div class="display-flex justify-content-between align-center">
        <div class="display-flex align-center">
          <button
            class="btn btn-fabrica display-flex p-v-5 p-h-10 border-radius-15 m-l-5"
            @click="sidebarToggle"
          >
            <i class="o-icon o-menu-34"></i>
          </button>
          <div class="header__logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
        <div class="display-flex align-center">
          <button
            class="btn btn-fabrica border-radius-30 font-size-14 p-v-5 p-h-15 m-l-5"
            @click="onClickHandler"
          >
            <i class="o-icon o-single-01"></i>
          </button>
          <button
            class="btn btn-outline-fabrica border-radius-30 font-size-14 p-v-5 p-h-10"
            @click="onClickHandler(true)"
          >
            {{ $t('header.advertisementRegistration') }}
          </button>
        </div>
      </div>
    </div>
    <BurgerMenu :is-open.sync="isOpen" @close="isOpen = false" />
    <TheAuth
      :is-open.sync="isOpenAuthModal"
      :is-create-button="false"
      @closeModal="isOpenAuthModal = false"
    />
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',
  data() {
    return {
      isOpen: false,
      isCreateButton: false,
      isOpenAuthModal: false,
    }
  },
  methods: {
    onClickHandler(createAdButton) {
      if (createAdButton) {
        if (!this.isAuthenticated && !this.clientSideIsAuthenticated) {
          this.isCreateButton = true
          this.isOpenAuthModal = true
        } else {
          this.$router.push({
            name: 'create-ad___' + this.$cookies.get('lang'),
          })
        }
      } else if (!this.isAuthenticated && !this.clientSideIsAuthenticated) {
        this.isOpenAuthModal = true
      } else {
        this.$router.push({ name: 'my-fabrica___' + this.$cookies.get('lang') })
      }
    },
    sidebarToggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
