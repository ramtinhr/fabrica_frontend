<template>
  <header class="header">
    <div class="container margin-auto display-flex align-center">
      <div class="col-md-1">
        <div class="header__logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
      </div>
      <div class="col-md-6">
        <nav class="header__navbar">
          <ul>
            <li>{{ $t('header.mainPage') }}</li>
            <li>{{ $t('header.latestAdvertises') }}</li>
          </ul>
        </nav>
      </div>
      <div class="col-md-6 text-left">
        <div class="haeder__actions">
          <button class="btn btn-fabrica border-radius-30">
            {{ $t('header.login') }} / {{ $t('header.register') }}
          </button>
          <button class="btn btn-outline-fabrica border-radius-30">
            {{ $t('header.advertisementRegistration') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
