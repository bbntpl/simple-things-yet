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

	// eslint-disable-next-line max-lines-per-function
	async function addCategoriesWithLatestBlogs(queries) {
		changeStatusTo('loading');
		try {
			const fetchedCategories = await fetchCategoriesWithLatestBlogs({
				...queries,
				excludeIds: extractIds(unref(blogs.value)),
			});
			const extractedBlogs = [];
			const uniqueCategories = [];
			fetchedCategories.forEach((category) => {
				extractedBlogs.push(...category.publishedBlogs);
				const doesCategoryExists = getCategoryById.value(category.id);
				if (!doesCategoryExists) {
					const blogIds = category.publishedBlogs.map((blog) => blog.id);
					const blogsByCategory = blogsStore.getBlogsByCategory(category.id);

					// Ensure at least 2 published blogs for each category in a store
					const additionalBlogIds = blogsByCategory
						.slice(0, Math.max(0, 2 - category.publishedBlogs.length))
						.map((blog) => blog.id);

					const updatedPublishedBlogs = [...blogIds, ...additionalBlogIds];
					uniqueCategories.push({
						...category,
						publishedBlogs: updatedPublishedBlogs,
					});
				}
			});

			categories.value.push(...uniqueCategories);
			blogsStore.addExtractedBlogs(extractedBlogs);
			changeStatusTo('succeeded');
		} catch (err) {
			changeStatusTo('failed');
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

		return categoriesByTotalBlogs.reduce((result, category) => {
			const blogIds = category.publishedBlogs;
			const publishedBlogs = blogIds
				.map((blogId) => blogsStore.getBlogById(blogId))
				.filter((blog) => blog !== undefined);

			// Only take two published blogs for each category to display in homepage
			if (publishedBlogs.length >= 2) {
				result.push({
					name: category.name,
					publishedBlogs: publishedBlogs.slice(0, 2),
				});
			}

			return result;
		}, []);
	});

	const isReadyToFetch = computed(
		() => status.value !== 'fully-fetched' || status.value !== 'loading',
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
