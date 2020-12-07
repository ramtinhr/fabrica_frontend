<template>
  <div id="list" class="col-md-9 col-sm-8 col-xs-12">
    <ListSearchBox />
    <ListSelectBoxes />
    <div class="display-flex justify-content-between align-center m-t-30">
      <div>
        <span>{{ $t('numberOfResults') }}</span>
        <span class="text-dimLightGray m-r-10"
          >{{ advertises.count }} {{ $t('item') }}</span
        >
      </div>
      <div class="list__change-view">
        <i
          :class="{ 'list__change-view-active': isHorizontalView }"
          class="o-icon o-menu-to-close-2"
          @click="isHorizontalView = true"
        ></i>
        <i
          :class="{ 'list__change-view-active': !isHorizontalView }"
          class="o-icon o-grid-to-list"
          @click="isHorizontalView = false"
        ></i>
      </div>
    </div>
    <div v-if="!isHorizontalView" class="row p-v-15 hidden-xs">
      <VerticalAdvertise
        v-for="advertise in advertises.data"
        :key="advertise.id"
        :is-list-page="true"
        :img="advertise.featured_image"
        :title="advertise.title"
        :price="advertise.price"
        :created-at="advertise.created_at_jalali_date"
      />
    </div>
    <div
      v-if="this.$mq === 'xs' || this.$mq === 'sm' || isHorizontalView"
      class="row p-v-15"
    >
      <HorizontalAdvertise
        v-for="advertise in advertises.data"
        :key="advertise.id"
        :is-list-page="true"
        :img="advertise.featured_image"
        :title="advertise.title"
        :price="advertise.price"
        :created-at="advertise.created_at_jalali_date"
      />
    </div>
    <div v-if="isLoading" class="list__loading">
      <TheLoading :color="'#707070'" :size="'40px'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdvertiseList',
  data() {
    return {
      isHorizontalView: false,
      page: 1,
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['getResource', 'getLimit']),
    advertises() {
      return this.getResource('list')
    },
    limit() {
      return this.getLimit('list')
    },
  },
  mounted() {
    this.lazyLoad()
  },
  methods: {
    lazyLoad() {
      const list = document.getElementById('list')
      if (list != null) {
        window.onscroll = () => {
          if (window.innerHeight + window.scrollY >= list.scrollHeight) {
            if (
              this.advertises.data.length >= this.limit * this.page &&
              !this.isLoading
            ) {
              this.isLoading = true
              this.page++
              this.$store
                .dispatch('get', {
                  url: '/ads/search',
                  config: {
                    params: {
                      limit: this.limit,
                      page: this.page,
                    },
                  },
                })
                .then((resp) => {
                  this.$store.dispatch('add', {
                    storeName: 'list',
                    data: resp.data.data,
                    isData: true,
                  })
                  this.isLoading = false
                })
            }
          }
        }
      }
    },
  },
}
</script>
