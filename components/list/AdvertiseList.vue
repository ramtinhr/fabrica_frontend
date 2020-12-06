<template>
  <div class="col-md-9 col-sm-8 col-xs-12">
    <div class="row p-v-15 hidden-xs">
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
    <div v-if="this.$mq === 'xs' || this.$mq === 'sm'" class="row p-v-15">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdvertiseList',
  computed: {
    ...mapGetters(['getResource']),
    advertises() {
      return this.getResource('list')
    },
  },
}
</script>
