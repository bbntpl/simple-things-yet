import { createApp } from 'vue';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import { HomeFilled, House } from '@element-plus/icons-vue';

const iconsToRegister = { HomeFilled, House };

import 'element-plus/dist/index.css';
import './assets/styles/variables.css';
import './assets/styles/reset.css';

import App from './components/App.vue';
import router from './router';

const pinia = createPinia();

const app = createApp(App);

for (const [key, component] of Object.entries(iconsToRegister)) {
	app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(ElementPlus);

// error configurations
app.config.errorHandler = (err) => {
	console.log(err);
};

app.mount('#app');
