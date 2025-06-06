import { createStore } from 'vuex'


import product from "./product";
import user from "./user"

const modules = {

  user,
  product,

};

export default createStore({
    modules,
})
