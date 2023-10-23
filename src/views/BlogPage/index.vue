<template>
	<div v-if="blogArticle" class="blog-article">
		<p>{{ blogArticle.title }}</p>
		<p>
			{{ blogArticle.slug }}
		</p>
	</div>
	<div v-else-if="!isLoading()">This blog does not exists yet.</div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import { useBlogsStore } from '@/stores/blogs';
import { execInit, isLoading } from '@/utils/helpers';

export default {
	name: 'BlogPage',
	props: {
		blog: {
			type: Object,
			default: undefined,
		},
	},
	setup() {
		const blogsStore = useBlogsStore();
		const route = useRoute();

		const slug = route.params.slug;
		const blogArticle = computed(() => blogsStore.getBlogBySlug(slug));

		onMounted(async () => {
			if (blogArticle.value) return;
			await execInit(blogsStore.addBlogBySlug(route.params.slug), {
				errorMsg: 'Something went wrong when fetching a blog',
			});
		});

		return { blogArticle, isLoading: computed(() => isLoading()) };
	},
};
</script>
