<template>
  <div>
    <div class="top-bg">
      <div class="fabrica-container">
        <div class="p-r-30">
          <h2 class="text-dimGray">{{ $t('termsAndConditions') }}</h2>
        </div>
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
