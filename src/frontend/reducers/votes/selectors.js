
export const getVotes = state => (
  state.votes
)

export const getVotesData = state => (
  getVotes(state).data
)

export const getVotesError = state => (
  getVotes(state).error
)

export const isLoading = state => (
  getVotes(state).loading
)

export const getLastTopRestaurant = state => (
  getVotes(state).lastTopRestaurant
)