import { getProfile } from "@/api";

const profile = {
    state: {
        profileData: null,
        profileLoading: false,
        profileImages: [],
    },
    mutations: {
        SET_PROFILE_DATA(state, data) {
            state.profileData = data;
        },
        SET_PROFILE_IMAGES(state, images) {
            state.profileImages = images;
        },
        SET_PROFILE_LOADING(state, value) {
            state.profileLoading = value;
        },
    },
    getters: {
        GET_PROFILE_DATA(state) {
            return state.profileData;
        },
        GET_PROFILE_IMAGES(state) {
            return state.profileImages;
        },
        GET_PROFILE_LOADING(state) {
            return state.profileLoading;
        },
    },
    actions: {
        async FETCH_PROFILE({ commit,getters },email) {
            commit("SET_PROFILE_LOADING", true);

            return getProfile(email, getters.GET_CURRENT_USER_TOKEN )
                .then((response) => {
                    if (response.status === "success") {
                        commit("SET_PROFILE_DATA", response.data.data);
                        commit("SET_PROFILE_IMAGES", response.data.images);
                    } else {
                        commit("SET_PROFILE_DATA", null);
                        commit("SET_PROFILE_IMAGES", []);
                    }
                })
                .finally(() => {
                    commit("SET_PROFILE_LOADING", false);
                });
            
        },
    },
};

export default profile;
