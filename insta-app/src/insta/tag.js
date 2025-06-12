import {searchImagesByTag} from "@/api/index"
const tag = {
    state: {
        tag: "",
        tagLoading: false,
        tagImages: [],
    },
    mutations: {
        SET_TAG(state, tag) {
            state.tag = tag;
        },
        SET_TAG_LOADING(state, isLoading) {
            state.tagLoading = isLoading;
        },
        SET_TAG_IMAGES(state, images) {
            state.tagImages = images;
        },
    },
    getters: {
        GET_TAG(state) {
            return state.tag;
        },
        GET_TAG_LOADING(state) {
            return state.tagLoading;
        },
        GET_TAG_IMAGES(state) {
            return state.tagImages;
        },
    },
    actions: {
        async FETCH_TAG_IMAGES({ commit, getters}) {
            commit("SET_TAG_LOADING", true);
            try {
                const response = await searchImagesByTag(getters.GET_TAG, getters.GET_CURRENT_USER_TOKEN)
                commit("SET_TAG_IMAGES", response.data);
            } catch (error) {
                console.error("Error fetching tag images:", error);
                commit("SET_TAG_IMAGES", []);
            } finally {
                commit("SET_TAG_LOADING", false);
            }
        },
        SET_TAG({ commit }, tag) {
            commit("SET_TAG", tag);
        },
    },
};

export default tag;
  
