
export const getUser = state => (
  state.user
)

export const getUserData = state => (
  getUser(state).data
)

export const getUserError = state => (
  getUser(state).error
)

export const isLoading = state => (
  getUser(state).loading
)

export const isLogged = state => (
  getUser(state).logged
)