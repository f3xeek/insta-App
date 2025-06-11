import { createApp } from 'vue'
import App from './App.vue'
import store from "./insta/index"
import router from "./router"
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";
import Menubar from "primevue/menubar";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Card", Card);
app.component("Menubar", Menubar);
app.mount("#app");