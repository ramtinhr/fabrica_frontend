<template>
  <div class="modal-component">
    <transition v-if="isOpen" name="fade">
      <div class="modal-backdrop" />
    </transition>
    <transition name="fade-in">
      <div v-if="isOpen" id="modal" class="modal">
        <div class="modal-dialog">
          <div class="modal-container">
            <div class="modal-head">
              <slot name="head" class="pull-right display-inline-block" />
            </div>
            <div class="body">
              <slot name="body" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        document.body.style.backgroundColor = '#f8f6f8'
        document.body.style.overflow = 'hidden'
        if (navigator.userAgent.toLowerCase().includes('firefox')) {
          document.body.style.paddingRight = '12px'
          document.body.classList.add('p-r-xs-0')
        } else {
          document.body.classList.add('p-r-15', 'p-r-xs-0')
        }
      } else {
        document.body.style.overflow = 'auto'
        if (navigator.userAgent.toLowerCase().includes('firefox')) {
          document.body.style.paddingRight = '0'
          document.body.classList.remove('p-r-xs-0')
        } else {
          document.body.classList.remove('p-r-15', 'p-r-xs-0')
        }
      }
    },
    $route() {
      this.isOpen = false
      document.body.style.overflow = 'auto'
      this.close()
    },
  },
  mounted() {
    window.addEventListener('keyup', (ev) => {
      if (ev.key === 'Escape') {
        this.close()
      }
    })
    this.checkAndClose()
  },
  updated() {
    this.checkAndClose()
  },
  beforeDestroy() {
    if (navigator.userAgent.toLowerCase().includes('firefox')) {
      document.body.style.paddingRight = '0'
      document.body.classList.remove('p-r-xs-0')
    } else {
      document.body.classList.remove('p-r-15', 'p-r-xs-0')
    }
    document.body.style.overflow = 'auto'
  },
  methods: {
    checkAndClose() {
      const modal = document.getElementById('modal')
      window.onclick = (e) => {
        if (e.target === modal) {
          this.close()
        }
      }
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
