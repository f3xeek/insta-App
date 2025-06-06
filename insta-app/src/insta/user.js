import { loginUser, logoutUser, getCurrentUser } from '@/api';

const user = {
    state: {
        userObject: null,
        userLoading: false,
    },
    mutations: {
        SET_CURRENT_USER(state, userObject) {
            state.userObject = userObject;
        },
        SET_CURRENT_USER_LOADING(state, value) {
            state.userLoading = value;
        }
    },
    getters: {
        GET_CURRENT_USER(state) {
            return state.userObject;
        },
        GET_CURRENT_USER_LOADING(state) {
            return state.userLoading;
        }
    },
    actions: {
        async LOGIN_USER({ commit, getters }, { email, password }) {

            commit("SET_CURRENT_USER_LOADING", true);
            return loginUser({ email, password })
                .then((userObject) => {
                    if (userObject.email) {
                        commit("SET_CURRENT_USER", userObject);
                    }else{
                        alert(userObject.reason)
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
                    .then((userObject) => {

                        console.log("biorę usera z serwera", userObject);
                        // jeśli serwer mówi że zalogowany to wstawiam go do store

                        if (userObject.email) {
                            commit("SET_CURRENT_USER", userObject);
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