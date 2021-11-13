import Cookie from 'universal-cookie'

export const cookie = {
  setToken: (token: string) => {
    const cookie = new Cookie()
    cookie.set('token', token, { path: '/' })
  },
  resetToken: () => {
    const cookie = new Cookie()
    cookie.remove('token', { path: '/' })
  },
}

const getToken = () => {
  const cookie = new Cookie()
  return cookie.get('token')
}

export const getFetchParams = () => {
  const token = getToken()
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}
