<template>
	<div class="tertiary-bg footer-layout">
		<div class="footer-content">
			<div class="footer-content__upper">
				<img
					class="logo__shape"
					src="../../../assets/images/sty_shape.png"
					alt="logo"
				/>
				<div v-for="content of linksList" :key="content.label">
					<footer-links-list :label="content.label" :items="content.items" />
				</div>
				<div class="footer-links"></div>
			</div>
			<div class="copyright">
				&copy; {{ copyrightYears.initial }} -
				{{ copyrightYears.current }} SimpleThingsYet
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

import FooterLinksList from './FooterLinksList.vue';

import './FooterLayout.css';
import '../../../assets/styles/styles.css';

const baseUrl = process.env.VUE_APP_BASE_URL;
const linksList = [
	{
		label: 'Resources',
		items: [
			{ name: 'Blog Categories', url: `${baseUrl}/blog-categories` },
			{ name: 'Blogs', url: `${baseUrl}/blogs` },
			{ name: 'FAQ', url: `${baseUrl}/faq` },
			{ name: 'About', url: `${baseUrl}/about` },
		],
	},
];

export default {
	name: 'FooterLayout',
	components: {
		FooterLinksList,
	},
	setup() {
		const copyrightYears = {
			initial: 2023,
			current: ref(new Date().getFullYear()),
		};
		return { copyrightYears, linksList };
	},
};
</script>
