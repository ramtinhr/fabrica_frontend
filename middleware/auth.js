export default function (context) {
  if (process.server && !context.store.getters.isAuthenticated) {
    context.redirect('/')
  }
}
