<template>
  <div class="list__select-boxes">
    <div class="row">
      <div class="col-md-4 col-sm-12 col-xs-12 m-b-xs-15 m-b-sm-15">
        <v-select
          :options="orderBy"
          :placeholder="$t('orderBy')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12 m-b-xs-15">
        <v-select
          :options="priority"
          :placeholder="$t('home.selectPriority')"
          label="title"
          dir="rtl"
        >
          <span slot="no-options"> {{ $t('noResultFound') }}</span>
        </v-select>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <button class="btn btn-secondary font-size-14">
          {{ $t('home.advancedSearch') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListSelectBoxes',
  data() {
    return {
      orderBy: [
        {
          title: 'صعودی قیمت',
          key: 'price_asc',
        },
        {
          title: 'نزولی قیمت',
          key: 'price_desc',
        },
        {
          title: 'صعودی تاریخ',
          key: 'created_at_asc',
        },
        {
          title: 'نزولی تاریخ',
          key: 'created_at_desc',
        },
      ],
      priority: [
        {
          title: 'عادی',
          key: 'normal',
        },
        {
          title: 'فوری',
          key: 'immediate',
        },
        {
          title: 'ویژه',
          key: 'special',
        },
        {
          title: 'ویژه فوری',
          key: 'immediate-special',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
