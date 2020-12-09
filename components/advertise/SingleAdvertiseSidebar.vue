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
            <span class="font-size-14 text-redOrange">{{ $t('normal') }}</span>
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
        </div>
      </div>
    </TheSidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SingleAdvertiseSidebar',
  computed: {
    ...mapGetters(['getResource']),
    advertise() {
      return this.getResource('advertise')
    },
  },
}
</script>
