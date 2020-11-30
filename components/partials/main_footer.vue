<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container margin-auto p-v-30">
        <div class="row">
          <div class="col-md-3">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 font-sans-bold m-b-30">
                {{ $t('footer.quickAccess') }}
              </span>
              <ul class="footer__quick-access">
                <li>{{ $t('aboutUs') }}</li>
                <li>{{ $t('termsAndConditions') }}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-3">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 font-sans-bold">
                {{ $t('footer.customMenu') }}
              </span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 font-sans-bold m-b-30">
                {{ $t('footer.subscribeToNewsletter') }}
              </span>
              <div class="position-relative m-b-20">
                <input
                  class="border-radius-30 border-none"
                  type="email"
                  name="email"
                  :placeholder="$t('enterYourEmail')"
                />
                <i class="o-icon o-email-83 footer__email-btn"></i>
              </div>
              <span class="text-white font-size-20 font-sans-bold">
                {{ $t('footer.symbols') }}
              </span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 font-sans-bold m-b-30">
                {{ $t('footer.contact') }}
              </span>
              <div class="display-flex align-center m-b-25">
                <div class="display-flex align-center">
                  <i class="o-icon o-phone-2 footer__icon"></i>
                </div>
                <div class="display-flex flex-direction-column">
                  <span class="font-size-18 text-white line-height-1"
                    >۰۲۱۷۷۹۸۵۱۸۸</span
                  >
                  <span class="font-size-18 text-white line-height-1"
                    >۰۹۱۲۲۴۶۸۹۲۰</span
                  >
                </div>
              </div>
              <div class="display-flex align-center m-b-25">
                <div class="display-flex align-center">
                  <i class="o-icon o-pin-3 footer__icon"></i>
                </div>
                <span class="font-size-18 text-white">
                  تهران پیروزی خ مقداد ک رنجبران پ ۱۳,واحد۸
                </span>
              </div>
              <div class="display-flex">
                <div class="display-flex align-center">
                  <i class="o-icon o-email-83 footer__icon"></i>
                </div>
                <div class="display-flex align-center">
                  <span class="font-size-18 text-white line-height-1">
                    info@fabrica.ir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      titles: [
        'footer.quickAccess',
        'footer.customMenu',
        'footer.subscribeToNewsletter',
        'footer.contact',
      ],
    }
  },
}
</script>
