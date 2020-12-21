export const state = () => ({
  offset: 0,
  selectedCategory: null,
  resource: {
    categories: {
      data: [],
    },
    subCategories: {
      data: [],
    },
    childCategories: {
      data: [],
    },
    states: {
      data: [],
    },
    cities: {
      data: [],
    },
    firstAdvertises: {
      data: [],
    },
    secondAdvertises: {
      data: [],
    },
    thirdAdvertises: {
      data: [],
    },
    fourthAdvertises: {
      data: [],
      isLoading: false,
    },
    fifthAdvertises: {
      data: [],
      isLoading: false,
    },
  },
  loading: false,
})
