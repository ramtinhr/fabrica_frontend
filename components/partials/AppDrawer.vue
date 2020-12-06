<template>
  <div class="app-drawer overflow-hidden">
    <ul>
      <li class="display-flex justify-content-between align-center">
        <p class="m-0 font-size-14 p-h-45">
          {{ $t('auth.profile') }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppDrawer',
  data() {
    return {
      isOpenUserSub: false,
      isOpenSubMenu: false,
      offlineVisible: true,
      isAuthenticated: false,
    }
  },
}
</script>
