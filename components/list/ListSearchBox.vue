<template>
  <div class="list__search-box">
    <input
      v-model="searchString"
      class="position-relative font-size-16 hidden-xs"
      type="text"
      :placeholder="$t('home.search')"
      @keypress="onKeypressHandler($event)"
      @keyup="autoSearch"
    />
    <input
      v-model="searchString"
      class="position-relative font-size-16 hidden-md hidden-lg hidden-sm"
      type="text"
      :placeholder="$t('home.searchResp')"
      @keypress="onKeypressHandler($event)"
      @keyup="autoSearch"
    />
    <button class="btn btn-fabrica" @click="search">
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListSearchBox',
  data() {
    return {
      searchString: null,
      timer: null,
    }
  },
  computed: {
    ...mapGetters(['getLimit']),
    limit() {
      return this.getLimit('list')
    },
  },
  methods: {
    onKeypressHandler(event) {
      if (event.key === 'Enter') {
        this.search()
      }
    },
    search() {
      this.$store
        .dispatch('get', {
          url: '/ads/search',
          storeName: 'list',
          fillData: false,
          config: {
            params: {
              limit: this.limit,
              q: this.searchString,
            },
          },
        })
        .then(() => this.$router.push({ query: { q: this.searchString } }))
    },
    autoSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.search()
      }, 600)
    },
  },
}
</script>
