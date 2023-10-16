import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useBlogsStore } from './blogs';

import {
	fetchCategoriesWithLatestBlogs,
	fetchCategoriesWithPublishedBlogs,
} from '@/api/categoryService';

// eslint-disable-next-line max-lines-per-function
export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref([]);
	const status = ref('idle');
	const blogsStore = useBlogsStore();

	async function addCategories(queries) {
		status.value = 'loading';
		try {
			const fetchedCategories = await fetchCategoriesWithPublishedBlogs(
				queries,
			);
			categories.value.push(...fetchedCategories);
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			console.error('Failed to fetch set of categories', err);
			throw err;
		}
	}

	function extractCategoriesIds(categories) {
		if (categories.length === 0) return [];
		return new Set(categories.value.map((category) => category.id));
	}

	// function filterExistingCategories(newCategories) {
	// 	const existingCategoriesIds = extractCategoriesIds(categories);
	// 	return newCategories.filter(
	// 		(category) => !existingCategoriesIds.has(category.id),
	// 	);
	// }

	async function addCategoriesWithLatestBlogs(queries) {
		status.value = 'loading';
		try {
			const fetchedCategories = await fetchCategoriesWithLatestBlogs({
				...queries,
				excludeIds: extractCategoriesIds(categories.value),
			});
			const extractedBlogs = [];

			const mappedFetchedCategories = fetchedCategories.map((category) => {
				extractedBlogs.push(...category.publishedBlogs);
				return {
					...category,
					publishedBlogs: category.publishedBlogs.map((blog) => {
						return blog.id;
					}),
				};
			});

			categories.value.push(...mappedFetchedCategories);
			blogsStore.addBlogs(extractedBlogs);
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			console.error('Failed to fetch set of categories', err);
			throw err;
		}
	}

	function sortCategories(sortBy = 'asc', sortByTotalBlogs = false) {
		const sortedCategories = [...categories.value];

		sortedCategories.sort((a, b) => {
			if (sortBy === 'asc') {
				return a.localeCompare(b);
			} else if (sortBy === 'desc') {
				return b.localeCompare(a);
			}
		});

		if (sortByTotalBlogs) {
			sortedCategories.sort(
				(a, b) => a.publishedBlogs.length - b.publishedBlogs.length,
			);
		}

		return sortedCategories;
	}

	const sortedCategoriesByNameAsc = sortCategories();
	const sortedCategoriesByNameDesc = sortCategories('desc');
	const sortedCategoriesByTotalBlogs = sortCategories('asc', true);

	function getCategoryById(categoryId) {
		return categories.value.values.find((cat) => cat.id === categoryId);
	}

	const getCategoriesWithEmbeddedBlogs = (totalBlogsLimit = 2) => {
		return sortedCategoriesByTotalBlogs
			.filter((category) => {
				return category.publishedBlogs >= totalBlogsLimit;
			})
			.map((category) => {
				const blogIds = category.blogs;
				const publishedBlogs = blogIds.map((blogId) => {
					return blogsStore.getBlogById(blogId);
				});
				return {
					name: category.name,
					publishedBlogs: publishedBlogs,
				};
			});
	};

	function isReadyForFetch() {
		return status.value === 'idle';
	}

	return {
		categories,
		addCategories,
		addCategoriesWithLatestBlogs,
		isReadyForFetch,
		sortedCategoriesByNameAsc,
		sortedCategoriesByNameDesc,
		sortedCategoriesByTotalBlogs,
		getCategoryById,
		getCategoriesWithEmbeddedBlogs,
	};
});
