<template>
  <div class="col-md-3 col-sm-4 col-xs-12">
    <TheSidebar>
      <div slot="head">
        <div class="m-b-25">
          <span class="font-size-16 text-dimLightGray">{{
            $t('advertise.specifications')
          }}</span>
        </div>
      </div>
      <div slot="body">
        <div class="advertise__single-sidebar-specifications">
          <div>
            <span class="font-size-14">{{ $t('advertise.type') }}</span>
            <span
              class="font-size-14 bg-orange text-white p-v-5 p-h-10 border-radius-10"
              >{{ $t('normal') }}</span
            >
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.advertiser') }}</span>
            <span class="font-size-14">{{ advertise.user.full_name }}</span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.created') }}</span>
            <span class="font-size-14">{{
              advertise.created_at_jalali_date
            }}</span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.state') }}</span>
            <span class="font-size-14">{{ advertise.city.state }}</span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.city') }}</span>
            <span class="font-size-14">{{ advertise.city.title }}</span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.mobileNumber') }}</span>
            <span class="font-size-14">{{ advertise.user.mobile_number }}</span>
          </div>
          <button
            v-if="isAuthenticated"
            class="btn btn-fabrica"
            @click="isOpen = true"
          >
            {{ $t('advertise.sendMessage') }}
          </button>
          <div>
            <a
              :href="`whatsapp://send?text=${url}`"
              data-action="share/whatsapp/share"
            >
              <i class="g-icon g-logo-whatsapp"></i>
            </a>
            <a
              :href="`https://twitter.com/home?status=${advertise.description}`"
            >
              <i class="g-icon g-logo-twitter"></i>
            </a>
            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
              ><i class="g-icon g-logo-facebook"></i>
            </a>
            <a
              :href="
                'https://telegram.me/share/url?url=' +
                advertise.title +
                '-' +
                url
              "
            >
              <i class="g-icon g-send"></i>
            </a>
          </div>
        </div>
      </div>
    </TheSidebar>
    <AdvertiseChatModal
      :id="advertise._id"
      :is-open="isOpen"
      @closeModal="isOpen = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SingleAdvertiseSidebar',
  data() {
    return {
      url: '',
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters(['getResource', 'isAuthenticated']),
    advertise() {
      return this.getResource('advertise')
    },
  },
  mounted() {
    if (process.browser) {
      this.url = window.location.href
    }
  },
}
</script>
