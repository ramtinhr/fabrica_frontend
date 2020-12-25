<template>
  <div class="terms">
    <div class="top-bg">
      <div class="fabrica-container">
        <h2 class="text-white">{{ $t('termsAndConditions') }}</h2>
      </div>
    </div>
    <div class="fabrica-container">
      <TermsAndConditions />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms',
}
</script>

<style scoped></style>
