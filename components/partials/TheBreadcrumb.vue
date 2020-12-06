<template>
  <div class="breadcrumb">
    <div class="fabrica-container">
      <ul>
        <li v-for="nav in navs">
          <nuxt-link :to="{ name: `${nav.link}___` }" tag="a">
            {{ nav.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumb',
  props: {
    navs: {
      type: Array,
      default: null,
    },
  },
}
</script>
