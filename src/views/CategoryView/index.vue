<template>
	<div
		v-if="category.data && !category.doesNotExists && category.blogs.length > 0"
	>
		<h1
			:style="{
				margin: '36px 0 0 0',
				fontWeight: 'bold',
				fontSize: '2rem',
			}"
		>
			{{ category.data.name }} blog articles
		</h1>
		<BlogsCollection
			v-if="category.data.publishedBlogs.length > 0"
			:blogs="category.blogs"
			:totalPublishedBlogs="category.data.publishedBlogs.length"
			:queries="{ category: category.data.id }"
		/>
	</div>
	<p v-else-if="category.doesNotExists">This category does not exists</p>
</template>

<script>
import { onMounted, reactive, watchEffect, unref } from 'vue';
import { useRoute } from 'vue-router';

import { useCategoriesStore } from '@/stores/categories';
import { useBlogsStore } from '@/stores/blogs';
import BlogsCollection from '@/components/blog/BlogsCollection';
import { execInit } from '@/utils/helpers';

export default {
	name: 'CategoryWithBlogsView',
	components: {
		BlogsCollection,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const route = useRoute();
		const categoriesStore = useCategoriesStore();
		const blogsStore = useBlogsStore();
		const categorySlug = route.params.slug;

		const category = reactive({
			data: null,
			doesNotExists: false,
			blogs: [],
		});

		watchEffect(() => {
			if (category.data === null) return;
			const blogs = blogsStore.getBlogsByCategory(category.data.id);

			if (blogs.length > 0) {
				category.blogs = unref(blogs);
			}
		});

		// Fetch the category if it doesn't exist in the store yet
		const fetchCategoryBySlugAndSet = async () => {
			return await categoriesStore.addCategoryBySlug(categorySlug);
		};

		const getPromises = async () => {
			const promises = [];
			const fetchedCategory = categoriesStore.getCategoryBySlug(categorySlug);
			if (!fetchedCategory) {
				category.doesNotExists = true;
				return promises;
			}

			const blogs = blogsStore.getBlogsByCategory(fetchedCategory.id);
			category.data = fetchedCategory;

			if (fetchedCategory && blogs && blogs.length === 0) {
				promises.push(
					blogsStore.addFetchedBlogs({
						limit: 2,
						sort: 'latest',
						category: category.data.id,
					}),
				);
			}

			return Promise.all(promises);
		};

		onMounted(async () => {
			// check if category exists already, if so, get it, otherwise, fetch it and set
			if (!categoriesStore.getCategoryBySlug(categorySlug)) {
				await execInit(fetchCategoryBySlugAndSet);
			}

			const promises = getPromises();
			if (promises.length === 0) return;
			const resolvePromises = async () => await promises;
			await execInit(resolvePromises);
		});

		return { category };
	},
};
</script>
