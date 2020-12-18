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
    <div
      v-if="$mq === 'xs' || $mq === 'sm' || isHorizontalView"
      class="row p-v-15"
    >
      <div v-if="isLoading('list')" class="list__loading">
        <TheLoading :color="'#707070'" :size="'60px'" />
      </div>
      <HorizontalAdvertise
        v-for="advertise in advertises.data"
        v-else
        :key="advertise.id"
        :is-list="true"
        :advertise="advertise"
      />
    </div>
    <div v-else class="row p-v-15 hidden-xs">
      <div v-if="isLoading('list')" class="list__loading">
        <TheLoading :color="'#707070'" :size="'60px'" />
      </div>
      <VerticalAdvertise
        v-for="advertise in advertises.data"
        v-else
        :key="advertise.id"
        :is-list="true"
        :advertise="advertise"
      />
    </div>
    <div v-if="isLoading2" class="list__lazyload">
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
      isGetAll: false,
      isLoading2: false,
    }
  },
  computed: {
    ...mapGetters(['getResource', 'getLimit', 'isLoading']),
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
      if (list) {
        window.onscroll = () => {
          if (window.innerHeight + window.scrollY + 200 >= list.scrollHeight) {
            if (
              this.advertises.data.length >= this.limit * this.page &&
              !this.isLoading2
            ) {
              this.isLoading2 = true
              this.page++
              const query = this.$route.query
              const ids = []
              if (query.category) {
                ids.push(query.category)
              }
              if (query.subCategory) {
                ids.push(query.subCategory)
              }
              this.$store
                .dispatch('get', {
                  url: '/ads/search',
                  config: {
                    params: {
                      limit: this.limit,
                      page: this.page,
                      q: query.q || null,
                      sort: query.order,
                      city_id: query.city,
                      category_ids: ids ? ids.join(',') : null,
                    },
                  },
                })
                .then((resp) => {
                  this.$store.dispatch('add', {
                    storeName: 'list',
                    data: resp.data.data,
                    isData: true,
                  })
                  this.isLoading2 = false
                })
            }
          }
        }
      }
    },
  },
}
</script>
