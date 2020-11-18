export default function ({ store, redirect, route }) {
  if (route.path === '/') {
    const user = store.state.auth.user
    if (!user) {
      return redirect('/login')
    }
    return redirect('/dashboard')
  }
}
