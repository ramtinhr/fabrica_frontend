<template>
  <div class="col-md-3 col-sm-6 col-xs-12 p-r-10 p-l-10">
    <div class="advertise">
      <div class="advertise__img-wrapper">
        <img v-if="img" :src="img" alt="آگهی" />
        <img v-else src="/images/placeholder.png" alt="آگهی" />
      </div>
      <div class="advertise__content">
        <div class="advertise__content-title">
          <span class="font-size-14 font-sans-bold">
            {{ title }}
          </span>
        </div>
        <div class="advertise__content-price">
          {{ price }}
        </div>
        <div class="advertise__content-created">
          {{ createdAt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advertise',
  props: {
    img: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    createdAt: {
      type: String,
      default: null,
    },
  },
}
</script>
