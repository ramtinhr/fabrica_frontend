<template>
  <input
    v-model="data"
    :name="name"
    :placeholder="placeholder"
    :class="classes"
    :disabled="disabled"
    :maxlength="maxlength"
    :type="type"
    @keypress="validate($event)"
    @change="change($event)"
    @keyup="keyup($event)"
  />
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    defaultValue: {
      type: [Number, String],
      default: null,
    },
    numberFormat: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    rules: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: null,
    }
  },
  watch: {
    data() {
      this.data = this.$peToEn(this.data)
      if (this.numberFormat) {
        let val = this.data
        if (/,/g.test(val)) {
          val = val.replace(/,/g, '')
        }

        this.data = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      this.$emit('input', this.data.toString().replace(/,/g, ''))
    },
    defaultValue() {
      if (this.defaultValue) {
        if (String(this.defaultValue).length > 0) {
          this.data = this.defaultValue
        }
      }
    },
  },
  methods: {
    change(evt) {
      this.$emit('change', evt)
    },
    keyup(evt) {
      this.$emit('keyup', evt)
    },
    validate(evt) {
      const charCode = evt.which ? evt.which : evt.keyCode

      // if input first letter was 0 can not insert 0 again
      if (
        evt.target.value.length === 1 &&
        evt.target.value === 0 &&
        charCode === 48
      ) {
        evt.preventDefault()
      }

      // if contain one dot dont allow to insert dot again
      if (
        evt.target.value.includes('.') &&
        (charCode === 46 || (!evt.target.value && charCode === 46))
      ) {
        evt.preventDefault()
      }

      // 1776 -> 1785 char code of : 0 - 9. only farsi and english digits allow
      if (
        (charCode > 1785 || charCode < 1776) &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 13
      ) {
        evt.preventDefault()
      }

      if (this.maxLenght > 0) {
        if (String(this.data).length >= Number(this.maxLenght)) {
          evt.preventDefault()
        }
      }

      return true
    },
  },
}
</script>
