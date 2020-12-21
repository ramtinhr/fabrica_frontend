<template>
  <span v-show="loading" class="v-spinner">
    <span class="v-clip" :style="spinnerStyle"></span>
  </span>
</template>

<script>
export default {
  name: 'ClipLoader',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#5dc596',
    },
    size: {
      type: String,
      default: '35px',
    },
    radius: {
      type: String,
      default: '100%',
    },
  },
  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        verticalAlign: 'middle',
        margin: '0 5px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: this.color + ' ' + this.color + ' transparent',
        borderRadius: this.radius,
        background: 'transparent',
      }
    },
  },
}
</script>
