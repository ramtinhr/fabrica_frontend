<template>
  <div class="home__main">
    <div class="fabrica-container">
      <HomeMainCategories />
      <div class="home__main-content">
        <HomeMainStatesSlide />
        <HomeMainSearchBox />
        <hr class="border-lightgray m-r-15 m-l-15" />
        <HomeMainSelectBoxes />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',
}
</script>
