import CookieParser from 'cookieparser'

export default ({ $axios, req }) => {
  if (process.client) {
    $axios.setToken(localStorage.getItem('access_token'), 'Bearer')
  } else if (
    req.headers.cookie &&
    req.headers.cookie.type === 'String' &&
    process.server
  ) {
    const cookies = CookieParser.parse(req.headers.cookie || '')
    if (cookies.token) {
      const token = cookies.token
      $axios.setToken(token, 'Bearer')
    }
  }
}
