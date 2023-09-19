import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import './assets/styles/variables.css';
import './assets/styles/reset.css';

import App from './components/App.vue';
import router from './router';

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);

// error configurations
app.config.errorHandler = (err) => {
	console.log(err);
};

app.mount('#app');
