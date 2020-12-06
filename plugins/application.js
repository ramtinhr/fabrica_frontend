export default ({ app: { $axios } }) => {
  if (process.env.IS_APPLICATION) {
    $axios.setToken(localStorage.getItem('access_token'), 'Bearer')
  }
}
