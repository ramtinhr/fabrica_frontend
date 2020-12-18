<template>
  <div>
    <TheHeader class="hidden-xs" />
    <MobileHeader
      v-if="$mq === 'xs' || $mq === 'sm'"
      class="hidden-lg hidden-md hidden-sm"
    />
    <TheBreadcrumb :navs="navs" />
    <div class="my-fabrica">
      <div class="fabrica-container">
        <div class="row">
          <MyFabricaSidebar />
          <MyFabricaContentTemplate>
            <div slot="body">
              <Nuxt />
            </div>
          </MyFabricaContentTemplate>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
export default {
  name: 'MyFabrica',
  data() {
    return {
      navs: [
        {
          title: this.$t('header.mainPage'),
          link: 'index',
        },
        {
          title: this.$t('header.myFabrica'),
          link: 'my-fabrica',
          color: 'lightgray',
        },
      ],
    }
  },
}
</script>
