import { defineStore, storeToRefs } from 'pinia';
import { computed, ref, unref } from 'vue';
import { useBlogsStore } from './blogs';
import {
	fetchCategoriesWithLatestBlogs,
	fetchCategoriesWithPublishedBlogs,
	fetchCategoryById,
	fetchCategoryBySlug,
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

	async function addCategoryById(categoryId) {
		changeStatusTo('loading');
		try {
			const fetchedCategory = await fetchCategoryById(categoryId);
			categories.value.push(fetchedCategory);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
			throw err;
		}
	}

	async function addCategoryBySlug(categorySlug) {
		changeStatusTo('loading');
		try {
			const fetchedCategory = await fetchCategoryBySlug(categorySlug);
			categories.value.push(fetchedCategory);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
			throw err;
		}
	}

	async function addCategories(queries) {
		changeStatusTo('loading');
		try {
			const fetchedCategories = await fetchCategoriesWithPublishedBlogs({
				...queries,
				excludeIds: extractIds(unref(categories.value)),
			});
			categories.value.push(...fetchedCategories);
			changeStatusTo('fully-fetched');
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
				excludeIds: extractIds(unref([...categories.value, ...blogs.value])),
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

	const sortedCategories = computed(() => {
		return (sortBy = 'asc', sortByTotalBlogs = false) => {
			const referencedCategories = [...unref(categories.value)];
			referencedCategories.sort((a, b) => {
				if (sortBy === 'asc') {
					return a.name.localeCompare(b.name);
				} else if (sortBy === 'desc') {
					return b.name.localeCompare(a.name);
				}
			});

			if (sortByTotalBlogs) {
				referencedCategories.sort(
					(a, b) => a.publishedBlogs.length - b.publishedBlogs.length,
				);
			}

			return referencedCategories;
		};
	});

	const getCategoryById = computed(() => {
		return (id) => categories.value.find((category) => category.id === id);
	});
	const getCategoryBySlug = computed(() => {
		return (slug) =>
			categories.value.find((category) => category.slug === slug);
	});
	const categoriesWithEmbeddedBlogs = computed(() => {
		const categoriesByTotalBlogs = sortedCategories.value('asc', true);
		return categoriesByTotalBlogs
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

	const isReadyToFetch = computed(
		() => status.value !== 'fully-fetched' && status.value !== 'loading',
	);

	return {
		categories,
		addCategoryById,
		addCategoryBySlug,
		addCategories,
		addCategoriesWithLatestBlogs,
		isReadyToFetch,
		sortedCategories,
		getCategoryById,
		getCategoryBySlug,
		categoriesWithEmbeddedBlogs,
	};
});
