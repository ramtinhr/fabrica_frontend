<template>
  <div class="breadcrumb">
    <div class="fabrica-container">
      <ul>
        <li v-for="(nav, index) in navs" :key="index">
          <mq-layout mq="md+">
            <nuxt-link
              :to="{ name: `${nav.link}___` + $cookies.get('lang') }"
              class="font-size-16"
              :class="nav.color ? `text-${nav.color}` : ''"
              tag="a"
            >
              {{ nav.title }}
            </nuxt-link>
          </mq-layout>
          <mq-layout :mq="['sm', 'xs']">
            <nuxt-link
              :to="{ name: `${nav.link}___` + $cookies.get('lang') }"
              class="font-size-16"
              :class="nav.color ? `text-${nav.color}` : ''"
              tag="a"
            >
              {{
                index === navs.length - 1 && navs.length > 2
                  ? $strLimit(nav.title, 10)
                  : $strLimit(nav.title, 18)
              }}
            </nuxt-link>
          </mq-layout>
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
