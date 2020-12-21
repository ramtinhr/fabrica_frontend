export default ({ app, store }, inject) => {
  inject('upload', (file) => {
    const files = file
    if (!files.length) {
      return
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      const formData = new FormData()
      formData.append('file', files[0])

      app.$axios
        .post('/uploads/image', formData, { emulateHTTP: true })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}
