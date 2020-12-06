<template>
  <header class="header">
    <div class="fabrica-container">
      <div class="row align-center">
        <div class="col-md-1 col-sm-2">
          <div class="header__logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
        <div class="col-md-6 col-sm-5">
          <nav class="header__navbar">
            <ul>
              <li class="font-size-16">
                <i class="o-icon o-home-51 m-l-5"></i>
                {{ $t('header.mainPage') }}
              </li>
              <li class="font-size-16">{{ $t('header.latestAdvertises') }}</li>
            </ul>
          </nav>
        </div>
        <div class="col-md-5 col-sm-5 text-left">
          <div class="header__actions">
            <button
              class="btn btn-fabrica border-radius-30 font-size-14 p-v-sm-5 p-h-sm-10"
              @click="isOpen = true"
            >
              <i class="o-icon o-single-01 m-l-5"></i>
              <span v-if="isAuthenticated || clientSideIsAuthenticated">
                {{ $t('header.myFabrica') }}
              </span>
              <span v-else>
                {{ $t('header.login') }} / {{ $t('header.register') }}
              </span>
            </button>
            <button
              class="btn btn-outline-fabrica border-radius-30 font-size-14 p-v-sm-5 p-h-sm-10"
            >
              {{ $t('header.advertisementRegistration') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isAuthenticated && !clientSideIsAuthenticated">
      <TheAuth :is-open="isOpen" @closeModal="isOpen = false" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      clientSideIsAuthenticated: 'auth/clientSideIsAuthenticated',
    }),
  },
}
</script>
