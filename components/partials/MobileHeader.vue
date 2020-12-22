<template>
  <header class="header">
    <div class="fabrica-container">
      <div class="display-flex justify-content-between align-center">
        <button
          class="btn btn-fabrica display-flex p-v-5 p-h-10 border-radius-15 m-l-5"
          @click="sidebarToggle"
        >
          <i class="o-icon o-menu-34"></i>
        </button>
        <div class="header__logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <button
          class="btn btn-outline-fabrica border-radius-30 font-size-14 p-v-5 p-h-10"
        >
          {{ $t('header.advertisementRegistration') }}
        </button>
      </div>
    </div>
    <BurgerMenu :is-open.sync="isOpen" @close="isOpen = false" />
  </header>
</template>

<script>
export default {
  name: 'MobileHeader',
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    sidebarToggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
