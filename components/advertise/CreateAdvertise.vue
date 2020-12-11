<template>
  <div class="fabrica-container">
    <div class="advertise__create">
      <ValidationObserver
        ref="CreateAdForm"
        class="advertise__create-form"
        @submit.prevent="passes(createAd)"
      >
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <ValidationProvider
                v-slot="{ errors }"
                name="title"
                username="title"
                rules="required"
              >
                <label for="title">{{ $t('advertise.title') }}</label>
                <input id="title" name="title" type="text" />
                <span v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="price"
                >{{ $t('advertise.price') }} ({{ $t('toman') }})
              </label>
              <input id="" type="text" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="priorty">{{ $t('advertise.priority') }}</label>
              <v-select
                :options="priority"
                :placeholder="$t('home.selectPriority')"
                label="title"
                dir="rtl"
              >
                <span slot="no-options"> {{ $t('noResultFound') }}</span>
              </v-select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for=""></label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
          <div class="col-md-4">
            <div class="form-group"><label for=""></label></div>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAdvertise',
  data() {
    return {
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
  methods: {
    createAd() {},
  },
}
</script>
