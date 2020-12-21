<template>
  <div>
    <TheHeader class="hidden-xs" />
    <MobileHeader
      v-if="$mq === 'xs' || $mq === 'sm'"
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
