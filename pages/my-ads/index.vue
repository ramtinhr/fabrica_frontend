<template>
  <div class="my-ads">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div v-if="isLoading" class="my-ads__loading">
        <TheLoading :color="'#707070'" :size="'60px'" />
      </div>
      <div
        v-else-if="!isLoading && ($mq === 'xs' || $mq === 'sm')"
        class="row p-t-60 p-b-45"
      >
        <div class="col-md-3 col-xs-4 col-xs-12">
          <TheSidebar>
            <div slot="head">
              <h4 class="m-b-20">
                {{ $t('header.myAdvertises') }}
              </h4>
            </div>
            <div slot="body">
              <div class="my-ads__avatar">
                <img
                  v-if="user && user.avatar_url"
                  :src="user.avatar_url"
                  alt="آواتار"
                />
                <img v-else src="/images/avatar.jpg" alt="آواتار" />
              </div>
              <span class="font-size-16">{{ user.full_name }}</span>
            </div>
          </TheSidebar>
        </div>
        <HorizontalAdvertise
          v-for="advertise in advertises"
          :key="advertise._id"
          :advertise="advertise"
          class="m-b-15"
        />
      </div>
      <div v-else class="row p-t-60 p-b-45 hidden-xs">
        <div class="col-md-3 col-xs-4 col-xs-12">
          <TheSidebar>
            <div slot="head">
              <h4 class="m-b-20">
                {{ $t('header.myAdvertises') }}
              </h4>
            </div>
            <div slot="body">
              <div class="my-ads__avatar">
                <img
                  v-if="user && user.avatar_url"
                  :src="user.avatar_url"
                  alt="آواتار"
                />
                <img v-else src="/images/avatar.jpg" alt="آواتار" />
              </div>
              <span class="font-size-16">{{ user.full_name }}</span>
            </div>
          </TheSidebar>
        </div>
        <VerticalAdvertise
          v-for="advertise in advertises"
          :key="advertise._id"
          :advertise="advertise"
          class="m-b-15"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAdvertises',
  data() {
    return {
      user: null,
      advertises: [],
      isLoading: false,
      navs: [
        {
          title: this.$t('header.mainPage'),
          link: 'index',
        },
        {
          title: this.$t('header.myAdvertises'),
          link: 'list',
          color: 'lightgray',
        },
      ],
    }
  },
  created() {
    this.getAdvertises()
    this.getUserInfo()
  },
  methods: {
    getAdvertises() {
      this.isLoading = true
      this.$store
        .dispatch('get', { url: '/ads/me' })
        .then((resp) => {
          this.advertises = resp.data.data
          this.getUserInfo()
        })
        .catch(() => (this.isLoading = false))
    },
    getUserInfo() {
      this.$store.dispatch('get', { url: '/users/me' }).then((resp) => {
        this.user = resp.data.data
        this.isLoading = false
      })
    },
  },
}
</script>
