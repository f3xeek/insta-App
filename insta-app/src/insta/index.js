import { createStore } from 'vuex'
import user from "./user"

const modules = {
  user,
};

export default createStore({
    modules,
})
