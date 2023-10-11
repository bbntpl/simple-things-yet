<template>
	<MainWrapper>
		<div class="blog-intro">
			<h1 class="home-title">A Personal Blog</h1>
			<p class="home-author secondary-text">By {{ authorName }}</p>
		</div>
		<div class="divider" />
		<div class="blogs-section">
			<h1>Latest Blogs</h1>
			<BlogCard
				v-for="(blog, index) in latestBlogs"
				:key="`latest_${blog.id}`"
				:variantType="index === 0 ? 'Full' : 'TitleOnly'"
				:blog="blog"
			/>
		</div>
	</MainWrapper>
</template>

<script>
import { onMounted, nextTick, ref } from 'vue';

import MainWrapper from '@/components/layouts/MainWrapper.vue';
import BlogCard from '@/components/blog/BlogCard';
import { useAuthorStore } from '@/stores/author';
import { useBlogsStore } from '@/stores/blog';

export default {
	name: 'HomePage',
	components: {
		MainWrapper,
		BlogCard,
	},
	setup() {
		const authorStore = useAuthorStore();
		const blogsStore = useBlogsStore();
		const authorName = authorStore.author?.name;

		const latestBlogs = ref([]);

		onMounted(async () => {
			console.log(blogsStore.isReadyForFetch());
			if (blogsStore.isReadyForFetch()) {
				const fetchedLatestBlogs = await blogsStore.addBlogs({
					sort: 'latest',
				});
				latestBlogs.value.push(...fetchedLatestBlogs);
			}
			nextTick(() => {});
		});

		return { latestBlogs, authorName };
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
