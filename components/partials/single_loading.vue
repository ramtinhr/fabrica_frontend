<template>
  <div class="single-loading">
    <div v-if="isWhite" class="loader white-loader" />
    <div v-else-if="isGray" class="loader gray-loader" />
    <div v-else class="loader black-loader" />
  </div>
</template>

<script>
export default {
  name: 'SingleLoading',
  props: {
    isWhite: {
      type: Boolean,
      default: true
    },
    isGray: {
      type: Boolean,
      default: false
    }
  }
}
</script>
