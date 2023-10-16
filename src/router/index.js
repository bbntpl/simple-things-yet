import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/about',
		name: 'about-view',
		component: () => import('../views/AboutView'),
	},
	{
		path: '/blog-categories',
		name: 'blog-categories-view',
		component: () => import('../views/BlogCategoriesView'),
	},
	{
		path: '/blogs',
		name: 'blogs-view',
		component: () => import('../views/BlogsView'),
	},
	{
		path: '/faq',
		name: 'faq-view',
		component: () => import('../views/FAQView'),
	},
	{
		path: '/blog/:id',
		name: 'blog-article',
		component: () => import('../views/BlogPage'),
	},
	{
		path: '/',
		name: 'home-page',
		component: () => import('../views/HomePage'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
