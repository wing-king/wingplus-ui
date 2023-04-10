import { createApp } from "vue";
import App from "./app.vue";
import WpUI from "@wingplus-ui/components";
const app = createApp(App);
app.use(WpUI);
app.mount("#app");
