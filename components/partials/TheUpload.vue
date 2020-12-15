<template>
  <div class="upload">
    <label v-if="!uploadStatus" :for="field">
      <img
        class="upload__img"
        :src.sync="imageUrl"
        alt="image"
        @load="onLoaded"
      />
    </label>
    <div v-else class="upload__loading">
      <TheLoading :color="'#707070'" :size="'40px'" />
    </div>
    <input
      :id="field"
      ref="file"
      :name="name"
      type="file"
      class="hidden"
      @change="upload($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'TheUpload',
  props: {
    file: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    field: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      uploadStatus: false,
      isLoaded: false,
    }
  },
  methods: {
    onLoaded() {
      this.isLoaded = true
    },
    upload() {
      this.uploadStatus = true
      this.$upload(this.$refs.file.files).then((res) => {
        this.uploadStatus = false
        const file = res.data.data.file
        const url = res.data.data.file_url
        this.$emit('getFile', file, url, this.index)
      })
    },
  },
}
</script>
