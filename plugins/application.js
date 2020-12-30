import CookieParser from 'cookieparser'

export default ({ $axios, req }) => {
  if (process.client) {
    $axios.setToken(localStorage.getItem('access_token'), 'Bearer')
  } else if (process.server && req.headers.cookie) {
    const cookies = CookieParser.parse(req.headers.cookie)
    const token = cookies.token
    $axios.setToken(token, 'Bearer')
  }
}
