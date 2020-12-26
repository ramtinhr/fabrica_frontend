<template>
  <div class="my-ads">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div v-if="isLoading" class="my-ads__loading">
        <TheLoading :color="'#707070'" :size="'60px'" />
      </div>
      <div
        v-else-if="
          !isLoading && ($mq === 'xs' || $mq === 'sm') && advertises.length
        "
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
        <div
          v-for="advertise in advertises"
          :key="advertise.id"
          class="col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30 m-b-15"
        >
          <HorizontalAdvertise :advertise="advertise" />
        </div>
      </div>
      <div v-else-if="advertises.length" class="row p-t-60 p-b-45 hidden-xs">
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
        <div
          v-for="advertise in advertises"
          :key="advertise.id"
          class="col-md-3 col-sm-4 col-xs-12 p-h-10 m-b-xs-30 m-b-15 position-relative"
        >
          <VerticalAdvertise
            :advertise="advertise"
            :is-user-ad="true"
            :is-open.sync="isOpen"
            :delete-modal-is-loading="deleteModalIsLoading"
            @openDeleteAdModal="isOpen = !isOpen"
            @deleteAd="deleteAdvertise"
          />
        </div>
      </div>
      <div v-else class="row m-t-100">
        <EmptyData />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyAdvertises',
  middleware: 'auth',
  data() {
    return {
      user: null,
      isLoading: false,
      deleteModalIsLoading: false,
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
  computed: {
    ...mapGetters(['getResource']),
    advertises() {
      return this.getResource('myAds')
    },
  },
  created() {
    this.getAdvertises()
  },
  methods: {
    getAdvertises() {
      this.isLoading = true
      this.$store
        .dispatch('get', { url: '/ads/me', storeName: 'myAds' })
        .then(() => {
          this.getUserInfo()
        })
        .catch(() => (this.isLoading = false))
    },
    deleteAdvertise(id) {
      this.deleteModalIsLoading = true
      this.$store.dispatch('delete', { url: `/ads/${id}` }).then(() => {
        this.deleteModalIsLoading = false
        this.isOpen = false
        this.$store.commit('myAds/REMOVE_ADD', { id })
        this.$toast.success('آگهی با موفقیت حذف شد')
      })
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
