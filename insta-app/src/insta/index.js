import { createStore } from 'vuex'
import user from "./user"
import tag from "./tag"
import profile from './profile';

const modules = {
  user,
  tag,
  profile
};

export default createStore({
    modules,
})
