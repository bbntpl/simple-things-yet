import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, toRaw } from 'vue';

import { useBlogsStore } from './blogs';

import {
	fetchCategoriesWithLatestBlogs,
	fetchCategoriesWithPublishedBlogs,
} from '@/api/categoryService';
import { extractIds } from '@/utils/helpers';

// eslint-disable-next-line max-lines-per-function
export const useCategoriesStore = defineStore('categories', () => {
	const blogsStore = useBlogsStore();
	const { blogs } = storeToRefs(blogsStore);

	const categories = ref([]);
	const status = ref('idle');

	function changeStatusTo(newValue) {
		if (status.value === newValue) return;
		if (status.value !== 'fully-fetched') {
			status.value = newValue;
		}
	}

	async function addCategories(queries) {
		changeStatusTo('loading');
		try {
			const fetchedCategories = await fetchCategoriesWithPublishedBlogs(
				queries,
			);
			categories.value.push(...fetchedCategories);
			if (queries?.limit === null) {
				changeStatusTo('fully-fetched');
			} else {
				changeStatusTo('succeeded');
			}
		} catch (err) {
			changeStatusTo('failed');
			console.error('Failed to fetch set of categories', err);
			throw err;
		}
	}

	async function addCategoriesWithLatestBlogs(queries) {
		changeStatusTo('loading');
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
			blogsStore.addExtractedBlogs(extractedBlogs);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
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
					const blog = blogsStore.getBlogById(blogId);
					if (!blog) {
						return blogId;
					}
					return blog;
				});

				return {
					name: category.name,
					publishedBlogs: publishedBlogs,
				};
			});
	});

	const isReadyToFetch = computed(() => status.value === 'idle');

	return {
		categories,
		addCategories,
		addCategoriesWithLatestBlogs,
		isReadyToFetch,
		categoriesByNameAsc,
		categoriesByNameDesc,
		categoriesByTotalBlogs,
		getCategoryById,
		categoriesWithEmbeddedBlogs,
	};
});
