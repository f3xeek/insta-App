import { loginUser, logoutUser, getCurrentUser } from '@/api';

const user = {
    state: {
        userToken: null,
        userLoading: false,
    },
    mutations: {
        SET_CURRENT_USER(state, userToken) {
            state.userToken = userToken;
        },
        SET_CURRENT_USER_LOADING(state, value) {
            state.userLoading = value;
        }
    },
    getters: {
        GET_CURRENT_USER(state) {
            return state.userToken;
        },
        GET_CURRENT_USER_LOADING(state) {
            return state.userLoading;
        }
    },
    actions: {
        async LOGIN_USER({ commit, _ }, { email, password }) {

            commit("SET_CURRENT_USER_LOADING", true);
            return loginUser({ email, password })
                .then((userToken) => {
                    if (userToken.status=="success") {
                        commit("SET_CURRENT_USER", userToken.data);
                    }else{
                        alert(userToken.message)
                    }
                })
                .finally(() => {
                    commit("SET_CURRENT_USER_LOADING", false);
                });
        },
        async LOGOUT_USER({ commit }) {
            commit("SET_CURRENT_USER", null);
            return await logoutUser()
        },
        async FETCH_CURRENT_USER({ commit, getters }) {

            if (getters.GET_CURRENT_USER) {
                console.log("jest user w store");
                return Promise.resolve();
            }

            else {

                commit("SET_CURRENT_USER_LOADING", true);
                return getCurrentUser()
                    .then((userToken) => {

                        console.log("biorę usera z serwera", userToken);

                        if (userToken.email) {
                            commit("SET_CURRENT_USER", userToken);
                        }
                    })
                    .finally(() => {
                        commit("SET_CURRENT_USER_LOADING", false);
                    });
            }
        }

    }
}

export default user