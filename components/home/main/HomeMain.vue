<template>
  <div class="home__main">
    <div class="fabrica-container">
      <HomeMainCategories />
      <div class="home__main-content">
        <HomeMainStatesSlide />
        <HomeMainSearchBox />
        <hr class="border-lightgray m-r-15 m-l-15" />
        <HomeMainSelectBoxes />
        <div class="home__main-advanced-search">
          <button class="btn btn-secondary font-size-14 p-v-xs-5 p-h-xs-15">
            {{ $t('home.advancedSearch') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',
}
</script>
