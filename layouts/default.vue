<template>
  <div>
    <TheHeader class="hidden-xs" />
    <MobileHeader
      v-if="this.$mq === 'xs' || this.$mq === 'sm'"
      class="hidden-lg hidden-md hidden-sm"
    />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: 'Fabrica',
}
</script>
