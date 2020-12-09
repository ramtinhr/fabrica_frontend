<template>
  <div class="advertise__single">
    <TheBreadcrumb :navs="navs" />
    <div class="fabrica-container">
      <div class="p-v-50">
        <div class="row">
          <SingleAdvertiseSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advertise',
  async asyncData({ store, route }) {
    await store.dispatch('get', {
      url: `/ads/${route.params.id}`,
      storeName: 'advertise',
    })
  },
}
</script>
