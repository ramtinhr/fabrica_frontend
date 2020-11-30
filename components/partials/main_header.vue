<template>
  <header class="header">
    <div class="container margin-auto">
      <div class="row align-center">
        <div class="col-sm-1 col-xs-6">
          <div class="header__logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
        <div class="col-sm-6 hidden-xs">
          <nav class="header__navbar">
            <ul>
              <li class="font-size-16">{{ $t('header.mainPage') }}</li>
              <li class="font-size-16">{{ $t('header.latestAdvertises') }}</li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-5 col-xs-6 text-left">
          <div class="header__actions">
            <button class="btn btn-fabrica border-radius-30 font-size-14">
              <i class="o-icon o-single-01 m-l-5"></i>
              {{ $t('header.login') }} / {{ $t('header.register') }}
            </button>
            <button
              class="btn btn-outline-fabrica border-radius-30 font-size-14"
            >
              {{ $t('header.advertisementRegistration') }}
            </button>
          </div>
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
