<template>
  <div class="home__main-select-boxes">
    <div class="row">
      <div class="col-md-4 col-sm-4 col-xs-12 m-b-xs-15">
        <v-select
          label="title"
          :placeholder="$t('home.selectSubCategory')"
          dir="rtl"
        >
          <span slot="no-options"> ابتدا دسته بندی اصلی را انتخاب کنید </span>
        </v-select>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12 m-b-xs-15">
        <v-select
          label="title"
          :placeholder="$t('home.selectPriority')"
          dir="rtl"
        >
          <span slot="no-options"> نتیجه ای یافت نشد </span>
        </v-select>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12">
        <v-select label="title" :placeholder="$t('home.selectCity')" dir="rtl">
          <span slot="no-options"> نتیجه ای یافت نشد </span>
        </v-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeMainSelectBoxes',
}
</script>
