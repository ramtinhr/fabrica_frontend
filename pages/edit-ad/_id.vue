<template>
  <div v-if="isLoading" class="my-ads__loading">
    <TheLoading :color="'#707070'" :size="'60px'" />
  </div>
  <EditAdvertise v-else :advertise="advertise" />
</template>

<script>
export default {
  name: 'EditAd',
  middleware: 'auth',
  data() {
    return {
      advertise: null,
      isLoading: false,
    }
  },
  created() {
    this.getAdvertise()
  },
  methods: {
    getAdvertise() {
      this.isLoading = true
      this.$store
        .dispatch('get', { url: `/ads/${this.$route.params.id}` })
        .then((resp) => {
          this.advertise = resp.data.data
          this.isLoading = false
        })
    },
  },
}
</script>
