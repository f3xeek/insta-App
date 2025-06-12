import { createStore } from 'vuex'
import user from "./user"
import tag from "./tag"

const modules = {
  user,
  tag
};

export default createStore({
    modules,
})
