<template>
  <div class="breadcrumb">
    <div class="fabrica-container">
      <ul>
        <li v-for="(nav, index) in navs" :key="index">
          <nuxt-link
            :to="{ name: `${nav.link}___` + $cookies.get('lang') }"
            class="font-size-16"
            tag="a"
          >
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
