<template>
  <div class="list__select-boxes">
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12 m-b-xs-15 m-b-sm-15">
        <v-select
          v-model="selectedOrder"
          :options="orderBy"
          :placeholder="$t('orderBy')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 m-b-xs-15">
        <v-select
          v-model="selectedPriority"
          :options="priority"
          :placeholder="$t('home.selectPriority')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListSelectBoxes',
  data() {
    return {
      selectedOrder: null,
      selectedPriority: null,
      orderBy: [
        {
          title: 'صعودی قیمت',
          key: 'price_asc',
        },
        {
          title: 'نزولی قیمت',
          key: 'price_desc',
        },
        {
          title: 'صعودی تاریخ',
          key: 'created_at_asc',
        },
        {
          title: 'نزولی تاریخ',
          key: 'created_at_desc',
        },
      ],
      priority: [
        {
          title: 'عادی',
          key: 'normal',
        },
        {
          title: 'فوری',
          key: 'immediate',
        },
        {
          title: 'ویژه',
          key: 'special',
        },
        {
          title: 'ویژه فوری',
          key: 'immediate-special',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLimit']),
    limit() {
      return this.getLimit('list')
    },
  },
  watch: {
    selectedOrder(val) {
      if (val) {
        this.search()
      }
    },
    selectedPriority(val) {
      if (val) {
        this.search()
      }
    },
  },
  methods: {
    async search() {
      const q = this.$route.query.q || null
      await this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'list',
          fillData: false,
          config: {
            params: {
              limit: this.limit,
              sort: this.selectedOrder ? this.selectedOrder.key : null,
              q,
            },
          },
        })
        .then(() =>
          this.$router.push({ query: { sort: this.selectedOrder, q } })
        )
    },
  },
}
</script>

<style scoped></style>
