<template>
	<MainWrapper>
		<div class="blog-intro">
			<h1 class="home-title">A Personal Blog</h1>
			<p class="home-author secondary-text">By {{ authorName }}</p>
		</div>
	</MainWrapper>
</template>

<script>
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import { useAuthorStore } from '@/stores/author';

export default {
	name: 'HomePage',
	components: {
		MainWrapper,
	},
	setup() {
		const authorStore = useAuthorStore();
		const authorName = authorStore.author?.name;

		return { authorName };
	},
};
</script>

<style scoped>
.blog-intro {
	display: flex;
	padding: 24px 0px;
	flex-direction: column;
	align-items: flex-end;
	gap: 1.5rem;
}

.home-title {
	color: #000;
	font-size: 48px;
	font-weight: 700;
}

.home-author {
	font-size: 20px;
	font-weight: 300;
}
</style>
