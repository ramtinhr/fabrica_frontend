<template>
  <TheModal :is-open.sync="isOpen" @close="closeModal()">
    <div slot="head">
      <span class="font-size-16">
        {{ $t('advertise.AreSureYouWannaDeleteThisAdvertise') }}
      </span>
    </div>
    <div slot="body">
      <div class="advertise__delete-modal">
        <button class="btn btn-secondary" @click="closeModal">
          {{ $t('no') }}
        </button>
        <button class="btn btn-danger" @click="deleteAdvertise">
          {{ $t('yes') }}
          <TheLoading v-if="isLoading" :color="'#fff'" :size="'22px'" />
        </button>
      </div>
    </div>
  </TheModal>
</template>

<script>
export default {
  name: 'AdvertiseDeleteModal',
  props: {
    id: {
      type: String,
      default: null,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: null,
    }
  },
  methods: {
    deleteAdvertise() {
      this.$emit('deleteAd')
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
