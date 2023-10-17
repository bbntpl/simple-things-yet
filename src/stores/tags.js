import { defineStore } from 'pinia';
import {
	fetchCategoriesWithLatestBlogs,
	fetchCategoriesWithPublishedBlogs,
} from '@/api/categoryService';
import { extractIds } from '@/utils/helpers';
import { ref } from 'vue';

// eslint-disable-next-line max-lines-per-function
export const useTagsStore = defineStore('tags', () => {
	const categories = ref([]);
	const status = ref('idle');

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

	// function filterExistingCategories(newCategories) {
	// 	const existingCategoriesIds = extractIds(categories);
	// 	return newCategories.filter(
	// 		(category) => !existingCategoriesIds.has(category.id),
	// 	);
	// }

	async function addCategoriesWithLatestBlogs(queries) {
		status.value = 'loading';
		try {
			const fetchedCategories = await fetchCategoriesWithLatestBlogs({
				...queries,
				excludeIds: extractIds(
					[...categories.value, ...blogs.value].map(toRaw),
				),
			});

			const extractedBlogs = [];
			const mappedFetchedCategories = fetchedCategories.map((category) => {
				extractedBlogs.push(...category.publishedBlogs);
				return {
					...category,
					publishedBlogs: category.publishedBlogs.map((blog) => blog.id),
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
		const sortedCategories = categories.value.map(toRaw);

		sortedCategories.sort((a, b) => {
			if (sortBy === 'asc') {
				return a.name.localeCompare(b);
			} else if (sortBy === 'desc') {
				return b.name.localeCompare(a);
			}
		});

		if (sortByTotalBlogs) {
			sortedCategories.sort(
				(a, b) => a.publishedBlogs.length - b.publishedBlogs.length,
			);
		}

		return sortedCategories;
	}

	const categoriesByNameAsc = computed(() => sortCategories());
	const categoriesByNameDesc = computed(() => sortCategories('desc'));
	const categoriesByTotalBlogs = computed(() => sortCategories('asc', true));

	const getCategoryById = computed(() => {
		return (id) => categories.value.find((category) => category.id === id);
	});

	const categoriesWithEmbeddedBlogs = computed(() => {
		return categoriesByTotalBlogs.value
			.filter((category) => category.publishedBlogs.length >= 2)
			.map((category) => {
				const blogIds = category.publishedBlogs;
				const publishedBlogs = blogIds.map((blogId) => {
					return blogsStore.getBlogById(blogId);
				});
				return {
					name: category.name,
					publishedBlogs: publishedBlogs,
				};
			});
	});

	const isReadyForFetch = computed(() => status.value === 'idle');

	return {
		categories,
		addCategories,
		addCategoriesWithLatestBlogs,
		isReadyForFetch,
		categoriesByNameAsc,
		categoriesByNameDesc,
		categoriesByTotalBlogs,
		getCategoryById,
		categoriesWithEmbeddedBlogs,
	};
});
