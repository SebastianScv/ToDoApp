import "./assets/css/tailwind.css";
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import Unicon from "./uniIcons";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(router);
app.use(Unicon);
app.use(store);
app.use(VueAxios, axios);

app.mount("#app");
