import { createApp } from 'vue';
import App from './app.vue';
import { WpButton } from '@wingplus-ui/components';
const app = createApp(App);
app.use(WpButton);

app.mount('#app');
