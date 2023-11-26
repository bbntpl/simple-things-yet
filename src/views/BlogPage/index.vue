<template>
	<div
		v-if="blogArticle.data && !blogArticle.doesNotExists"
		class="blog-article"
	>
		<p>{{ blogArticle.data.title }}</p>
		<p>
			{{ blogArticle.data.slug }}
		</p>
	</div>
	<div v-else-if="blogArticle.doesNotExists">
		This blog does not exists yet.
	</div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { useBlogsStore } from '@/stores/blogs';
import { execInit } from '@/utils/helpers';

export default {
	name: 'BlogPage',
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const blogsStore = useBlogsStore();
		const route = useRoute();

		const blogSlug = route.params.slug;
		const blog = reactive({
			data: null,
			doesNotExists: false,
			category: null,
			categoryImage: null,
			blogImage: null,
			tags: [],
		});

		const fetchBlogBySlugAndSet = async () => {
			return await blogsStore.addBlogBySlug(blogSlug);
		};

		const fetchDocsByRefsAndGetPromises = async () => {
			const promises = [];
			const fetchedBlog = blogsStore.getBlogBySlug(blogSlug);
			if (!fetchedBlog) {
				blog.doesNotExists = true;
				return promises;
			}

			blog.data = fetchedBlog;

			return promises;
		};

		onMounted(async () => {
			// check if blog exists already on the store, if not, fetch it and set, otherwise, there's no need
			if (!blogsStore.getBlogBySlug(blogSlug)) {
				await execInit(fetchBlogBySlugAndSet);
			}

			const promises = fetchDocsByRefsAndGetPromises();
			if (promises.length === 0) return;
			const resolvePromises = async () => await promises;
			await execInit(resolvePromises);
		});

		return { blogArticle: blog };
	},
};
</script>
