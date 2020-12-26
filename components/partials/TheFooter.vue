<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="fabrica-container p-v-40">
        <div class="row justify-content-between">
          <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 text-bold m-b-30">
                {{ $t('footer.quickAccess') }}
              </span>
              <ul class="footer__top-quick-access">
                <li>
                  <nuxt-link
                    :to="{ name: 'about-us___' + $cookies.get('lang') }"
                    tag="a"
                    >{{ $t('aboutUs') }}
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    :to="{ name: 'terms___' + $cookies.get('lang') }"
                    tag="a"
                  >
                    {{ $t('termsAndConditions') }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 text-bold m-b-30">
                {{ $t('footer.contact') }}
              </span>
              <div class="display-flex m-b-25">
                <i class="o-icon o-phone-2 footer__top-icon"></i>
                <div class="display-flex flex-direction-column">
                  <span class="font-size-18 text-white line-height-1"
                    >۰۲۱۶۶۹۳۲۲۷۶</span
                  >
                  <span class="font-size-18 text-white line-height-1"
                    >۰۹۱۲۲۴۶۸۹۲۰</span
                  >
                </div>
              </div>
              <div class="display-flex align-center m-b-25">
                <div class="display-flex align-center">
                  <i class="o-icon o-pin-3 footer__top-icon"></i>
                </div>
                <span class="font-size-18 text-white">
                  میدان توحید نصرت غربی بن بست حسنی پلاک۲
                </span>
              </div>
              <div class="display-flex m-b-xs-25">
                <div class="display-flex align-center">
                  <i class="o-icon o-email-83 footer__top-icon"></i>
                </div>
                <div class="display-flex align-center">
                  <span class="font-size-18 text-white line-height-1">
                    info@fabrica.ir
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 text-bold m-b-30">
                {{ $t('footer.symbols') }}
              </span>
            </div>
          </div>
          <div class="col-md-3 col-sm-3 col-xs-12">
            <div class="display-flex flex-direction-column">
              <span class="text-white font-size-20 text-bold m-b-30">
                {{ $t('footer.subscribeToNewsletter') }}
              </span>
              <div class="position-relative m-b-20">
                <input
                  class="hidden-sm"
                  type="email"
                  name="email"
                  :placeholder="$t('enterYourEmail')"
                />
                <input
                  class="hidden-lg hidden-md hidden-xs"
                  type="email"
                  name="email"
                  :placeholder="$t('email')"
                />
                <i class="o-icon o-email-83 footer__top-email-btn"></i>
              </div>
              <div class="footer__top-app">
                <a href="https://cafebazaar.ir/app/com.fabrika">
                  <img class="m-l-5" src="/images/cafebazaar.svg" alt="بازار" />
                </a>
                <a href="https://sibapp.com/applications/fabrica">
                  <img class="m-r-5" src="/images/sibapp.svg" alt="سیب اپ" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="fabrica-container">
          <div class="row">
            <div class="col-md-4 col-sm-4 col-xs-12">
              <div class="display-flex justify-content-between align-center">
                <i class="g-icon g-logo-whatsapp"></i>
                <i class="g-icon g-logo-google-plus"></i>
                <i class="g-icon g-logo-instagram"></i>
                <i class="g-icon g-icon g-send"></i>
              </div>
            </div>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <span class="m-l-5"> © </span>
              <span> {{ $t('footer.copyright') }}</span>
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
