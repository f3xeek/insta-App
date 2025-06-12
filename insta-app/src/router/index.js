import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import RegisterView from "@/views/RegisterView.vue";
import TagsView from '@/views/TagsView.vue';
import ProfileView from '@/views/ProfileView.vue';
import notFound from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/tags",
      name: "tagsView",
      component: TagsView,
    },
    {
      path: "/profile/:username",
      name: "profileView",
      component: ProfileView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: notFound,
    },
  ],
});

export default router