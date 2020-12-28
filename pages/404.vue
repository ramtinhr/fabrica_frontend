<template>
  <div class="not-found">
    <section class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
      <nuxt-link
        :to="{ name: 'index___' + $cookies.get('lang') }"
        class="more-link"
      >
        {{ $t('returnToMainPage') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped></style>
