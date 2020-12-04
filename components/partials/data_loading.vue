<template>
  <div class="data-loading text-center">
    <div class="text">
      {{ $t('loadingData') }}
    </div>
    <div class="loader" />
  </div>
</template>

<script>
export default {
  name: 'DataLoading',
}
</script>
