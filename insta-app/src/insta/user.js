import { loginUser, logoutUser, getCurrentUser } from '@/api';

const user = {
  state: {
    userData: null,
    userToken: null,
    userLoading: false,
    userImages: [],
  },
  mutations: {
    SET_CURRENT_USER_TOKEN(state, userToken) {
      state.userToken = userToken;
    },
    SET_CURRENT_USER_DATA(state, userData) {
      state.userData = userData;
    },
    SET_CURRENT_USER_IMAGES(state, userData) {
      state.userData = userData;
    },
    SET_CURRENT_USER_LOADING(state, value) {
      state.userLoading = value;
    },
  },
  getters: {
    GET_CURRENT_USER_TOKEN(state) {
      return state.userToken;
    },
    GET_CURRENT_USER_DATA(state) {
      return state.userData;
    },
    GET_CURRENT_USER_IMAGES(state) {
      return state.userImages;
    },
    GET_CURRENT_USER_LOADING(state) {
      return state.userLoading;
    },
  },
  actions: {
    async LOGIN_USER({ commit, _ }, { email, password }) {
      commit("SET_CURRENT_USER_LOADING", true);
      return loginUser({ email, password })
        .then((userToken) => {
          if (userToken.status == "success") {
            commit("SET_CURRENT_USER_TOKEN", userToken.data);
            console.log(userToken);
          } else {
            alert(userToken.message);
          }
        })
        .finally(() => {
          commit("SET_CURRENT_USER_LOADING", false);
        });
    },
    async LOGOUT_USER({ commit }) {
      commit("SET_CURRENT_USER_TOKEN", null);
      return await logoutUser();
    },
    async FETCH_CURRENT_USER({ commit, getters },force=false) {
        commit("SET_CURRENT_USER_LOADING", true);
        if (getters.GET_CURRENT_USER_DATA && !force){
            commit("SET_CURRENT_USER_LOADING", false);
        }else{
            return getCurrentUser(getters.GET_CURRENT_USER_TOKEN)
                .then((response) => {
                console.log("biorę usera z serwera", response);
                if (response.status == "success") {
                    commit("SET_CURRENT_USER_DATA", response.data.data);
                    commit("SET_CURRENT_USER_IMAGES", response.data.images);
                }
                })
                .finally(() => {
                commit("SET_CURRENT_USER_LOADING", false);
                });
        }
    },
  },
};

export default user