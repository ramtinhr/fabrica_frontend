export const state = () => ({
  limit: 20,
  resource: {
    loading: false,
    data: [],
  },
  loading: false,
})

export const mutations = {
  REMOVE_ADD(state, data) {
    const index = state.resource.data.findIndex(
      (advertise) => advertise.id === data.id
    )
    state.resource.data.splice(index, 1)
  },
}
