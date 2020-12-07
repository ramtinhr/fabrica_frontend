<template>
  <div class="list__search-box">
    <input
      class="position-relative font-size-16 hidden-xs"
      type="text"
      :placeholder="$t('home.search')"
    />
    <input
      class="position-relative font-size-16 hidden-md hidden-lg hidden-sm"
      type="text"
      :placeholder="$t('home.searchResp')"
    />
    <button class="btn btn-fabrica">
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ListSearchBox',
}
</script>
