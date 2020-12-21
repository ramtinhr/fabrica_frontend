export default ({ store, app }, inject) => {
  inject('message', (response) => {
    const status = response.data.message.status
    switch (status) {
      case 200:
        app.$toast.success(response.data.message.text_fa)
        break
      case 1003:
        app.$toast.error(response.data.message.text_fa)
        break
      case 1002:
        app.$toast.success(response.data.message.text_fa)
        break
      case 1001:
        app.$toast.error(response.data.message.text_fa)
        break
      default:
        return null
    }
  })
}
