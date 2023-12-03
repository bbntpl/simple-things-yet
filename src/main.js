import { createApp } from 'vue';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { HomeFilled, House, Document, Comment } from '@element-plus/icons-vue';

const iconsToRegister = { HomeFilled, House, Document, Comment };

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

app.use(VueDOMPurifyHTML);
app.use(pinia);
app.use(router);
app.use(ElementPlus);

// Error configurations
app.config.errorHandler = (err) => {
	console.log(err);
};

app.mount('#app');
