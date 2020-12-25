<template>
  <div class="term">
    <div class="term-rule" @click="faqToggle">
      <span class="font-size-16">
        {{ rule }}
      </span>
      <i class="o-icon" :class="isOpen ? 'o-minimal-up' : 'o-minimal-down'"></i>
    </div>
    <transition name="fade">
      <div v-show="isOpen" class="term-rule-desc">
        <div class="divider" />
        <p class="text-medium font-size-16" v-html="ruleDesc" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SingleTerm',
  props: {
    rule: {
      type: String,
      default: null,
    },
    ruleDesc: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    faqToggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
