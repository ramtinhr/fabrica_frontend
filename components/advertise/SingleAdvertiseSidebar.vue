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
            >
              {{ $t('normal') }}
            </span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.price') }}</span>
            <span v-if="advertise.price > 0" class="font-size-14">
              {{ $numberFormat($decimalNumber(advertise.price)) }}
              {{ $t('toman') }}
            </span>
            <span v-else class="font-size-14">
              {{ $t('advertise.call') }}
            </span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.advertiser') }}</span>
            <span class="font-size-14">{{ advertise.user.full_name }}</span>
          </div>
          <div>
            <span class="font-size-14">{{ $t('advertise.created') }}</span>
            <span class="font-size-14">
              {{ advertise.created_at_jalali_date }}
            </span>
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
            <span
              v-if="isAuthenticated || clientSideIsAuthenticated"
              class="font-size-14"
            >
              {{ advertise.user.mobile_number }}
            </span>
            <span v-else class="font-size-14"
              >*****{{ advertise.user.mobile_number.slice(0, 5) }}</span
            >
          </div>
          <button
            v-if="(isAuthenticated || clientSideIsAuthenticated) && !is_user_ad"
            class="btn btn-fabrica"
            @click="isOpen = true"
          >
            {{ $t('advertise.sendMessage') }}
          </button>
          <div v-else class="display-flex m-b-0">
            <button
              class="btn btn-danger m-l-5"
              @click="isOpenDeleteModal = true"
            >
              {{ $t('delete') }}
            </button>
            <nuxt-link
              :to="{
                name: 'edit-ad-id___' + this.$cookies.get('lang'),
                params: { id: advertise.id },
              }"
              class="btn btn-secondary m-r-5"
              tag="button"
            >
              {{ $t('edit') }}
            </nuxt-link>
          </div>
          <div>
            <a
              :href="`https://api.whatsapp.com/send?text=${url}`"
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
    <AdvertiseDeleteModal
      :id="advertise.id"
      :is-open="isOpenDeleteModal"
      :is-loading="isLoading"
      @closeModal="isOpenDeleteModal = false"
      @deleteAd="deleteAdvertise(advertise.id)"
    />
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
      isOpenDeleteModal: false,
      is_user_ad: false,
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      clientSideIsAuthenticated: 'auth/clientSideIsAuthenticated',
      getResource: 'getResource',
    }),
    advertise() {
      return this.getResource('advertise')
    },
  },
  created() {
    this.checkIsUserAd()
  },
  mounted() {
    if (process.browser) {
      this.url = window.location.href
    }
  },
  methods: {
    deleteAdvertise(id) {
      this.isLoading = true
      this.$store.dispatch('delete', { url: `/ads/${id}` }).then(() => {
        this.isLoading = false
        this.isOpenDeleteModal = false
        this.$toast.success('آگهی با موفقیت حذف شد')
        this.$router.push({ name: 'my-ads___' + this.$cookies.get('lang') })
      })
    },
    checkIsUserAd() {
      if (process.client) {
        if (this.advertise.user.id === window.localStorage.getItem('id')) {
          this.is_user_ad = true
        }
      }
    },
  },
}
</script>
