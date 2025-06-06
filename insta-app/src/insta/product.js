
const product = {
  state() {
    return {
      productObject: {},
      productLoading: false,
      productError: null,
    };
  },
  mutations: {
    SET_PRODUCT_OBJECT(state, newProduct) {
      state.productObject = newProduct;
    },
    SET_PRODUCT_LOADING(state, newProductLoading) {
      state.productLoading = newProductLoading;
    },
    SET_PRODUCT_ERROR(state, newProductError) {
      state.productError = newProductError;
    },
  },

  getters: {
    GET_PRODUCT_OBJECT(state) {
      return state.productObject;
    },
    GET_PRODUCT_LOADING(state) {
      return state.productLoading;
    },
    GET_PRODUCT_ERROR(state) {
      return state.productError;
    },
  },

  actions: {
    FETCH_PRODUCT({ commit }, options) {
      commit("SET_PRODUCT_LOADING", true);
      getProduct(options)
        .then((data) => {
          commit("SET_PRODUCT_OBJECT", data);
        })
        .catch((error) => {
          commit("SET_PRODUCT_ERROR", error);
        })
        .finally(() => {
          commit("SET_PRODUCT_LOADING", false);
        });
    },
  },
};

export default product;
