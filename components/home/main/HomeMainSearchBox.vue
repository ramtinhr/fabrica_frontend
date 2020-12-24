<template>
  <div class="home__main-search-box">
    <input
      v-model="searchString"
      class="position-relative font-size-16 hidden-xs"
      type="text"
      :placeholder="$t('home.search')"
      @keypress="onKeypressHandler($event)"
    />
    <input
      v-model="searchString"
      class="position-relative font-size-16 hidden-md hidden-lg hidden-sm"
      type="text"
      :placeholder="$t('home.searchResp')"
      @keypress="onKeypressHandler($event)"
    />
    <button class="btn btn-fabrica" @click="search">
      {{ $t('search') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeSearchBox',
  data() {
    return {
      searchString: null,
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedState',
      'getSelectedCategory',
      'getSelectedSubCategories',
      'getSelectedCity',
      'getSelectedOrder',
    ]),
  },
  methods: {
    onKeypressHandler(e) {
      if (e.key === 'Enter') {
        this.search()
      }
    },
    search() {
      this.$router.push({
        name: 'list___' + this.$cookies.get('lang'),
        query: {
          state: this.getSelectedState || null,
          category: this.getSelectedCategory || null,
          city: this.getSelectedCity || null,
          order: this.getSelectedOrder || null,
          subCategories:
            this.getSelectedSubCategories.length > 1
              ? this.getSelectedSubCategories.join(',')
              : this.getSelectedSubCategories[0],
          q: this.searchString,
        },
      })
      this.$store.commit('EMPTY_SEARCH_DATA')
    },
  },
}
</script>
