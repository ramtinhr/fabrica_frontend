<template>
  <div class="home__main-search-box">
    <input
      class="position-relative"
      type="text"
      :placeholder="$t('home.search')"
    />
    <button class="btn btn-fabrica">
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeSearchBox',
}
</script>
