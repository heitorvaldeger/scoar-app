export default function ({ store, redirect }) {
  const isAdmin = store.state.auth.user.isAdmin
  if (!isAdmin) {
    return redirect(404, '/el?e=rnf')
  }
}
