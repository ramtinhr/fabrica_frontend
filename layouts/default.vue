<template>
  <div>
    <TheHeader class="hidden-xs" />
    <MobileHeader v-if="$mq === 'xs' || $mq === 'sm'" />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: 'Fabrica',
}
</script>
