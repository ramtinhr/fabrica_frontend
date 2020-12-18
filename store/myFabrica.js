export const state = () => ({
  limit: 21,
  resource: {
    loading: false,
    data: [],
    bookmarked: {
      data: [],
    },
    chats: {
      data: [],
    },
    messages: {
      data: [],
    },
  },
  loading: false,
})

export const mutations = {
  ADD_MESSAGE(state, data) {
    state.resource.messages.data.push(data)
  },
}
