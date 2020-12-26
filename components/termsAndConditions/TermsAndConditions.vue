<template>
  <div class="p-v-60">
    <SingleTerm
      v-for="(term, i) in terms"
      :key="i"
      :rule="term.rule"
      :rule-desc="term.ruleDesc"
    />
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      terms: [
        {
          rule: 'شرایط ثبت آگهی',
          ruleDesc: this.$t('terms.RegistrationAdvertise'),
        },
        {
          rule: 'راهنمای خرید امن',
          ruleDesc: this.$t('terms.safeShoppingGuide'),
        },
        {
          rule: 'بیشتر احتیاط کنید وقتی',
          ruleDesc: this.$t('terms.beMoreCareful'),
        },
        {
          rule: 'بهتر است',
          ruleDesc: this.$t('terms.better'),
        },
        {
          rule: 'شرایط تصاویر آگهی',
          ruleDesc: this.$t('terms.termsOfAdImage'),
        },
        {
          rule: 'شرایط مشاهده و استفاده از آگهی ها',
          ruleDesc: this.$t('terms.viewingAndUsingAd'),
        },
        {
          rule: 'تعرفه ها برای ثبت اگهی',
          ruleDesc: this.$t('terms.tariffs'),
        },
        {
          rule: 'اگهی های فوری',
          ruleDesc: this.$t('terms.instantAds'),
        },
        {
          rule: 'اگهی های ویژه',
          ruleDesc: this.$t('terms.specialAds'),
        },
      ],
    }
  },
}
</script>
