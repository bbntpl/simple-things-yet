import { defineStore } from 'pinia';
import { computed, ref, toRaw, unref } from 'vue';

import {
	fetchPublishedBlogBySlug,
	fetchPublishedBlogs,
	fetchTotalPublishedBlogs,
} from '@/api/blogService';
import { extractIds } from '@/utils/helpers';

// eslint-disable-next-line max-lines-per-function
export const useBlogsStore = defineStore('blogs', () => {
	const blogs = ref([]);
	const totalPublishedBlogs = ref(null);

	const status = ref('idle');

	function filterNewBlogs(newBlogs) {
		const existingIds = extractIds(blogs.value.map(toRaw));
		return newBlogs.filter((blog) => !existingIds.some((id) => id === blog.id));
	}

	async function initializeTotalPublishedBlogs(queries = {}) {
		status.value = 'loading';
		try {
			const blogsSize = await fetchTotalPublishedBlogs(queries);
			totalPublishedBlogs.value = blogsSize;
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			throw err;
		}
	}

	async function addBlogBySlug(slug) {
		status.value = 'loading';
		try {
			const fetchedBlog = await fetchPublishedBlogBySlug(slug);

			blogs.value.push(fetchedBlog);
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			throw err;
		}
	}

	async function addFetchedBlogs(queries) {
		status.value = 'loading';
		try {
			// Fetch blogs by api request and update the state
			const fetchedBlogs = await fetchPublishedBlogs({
				...queries,
				excludeIds: extractIds(unref(blogs.value)),
			});
			blogs.value.push(...fetchedBlogs);
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			console.error('Failed to fetch published blogs', err.message);
			throw err;
		}
	}

	function addExtractedBlogs(newBlogs) {
		blogs.value.push(...filterNewBlogs(newBlogs));
	}

	function addExtractedBlog(newBlog) {
		blogs.value.push(...filterNewBlogs([newBlog]));
	}

	const paginatedBlogs = computed(() => {
		return (page, limit) => {
			const sortedBlogsByNewest = blogs.value.sort(
				(a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
			);
			const skip = Number(page) - 1;
			return sortedBlogsByNewest.slice(skip, skip + limit);
		};
	});

	const getLatestBlogs = computed(() => {
		return (length) => paginatedBlogs.value(1, length);
	});

	const getBlogById = computed(() => {
		return (id) => blogs.value.find((blog) => blog.id === id);
	});

	const getBlogBySlug = computed(() => {
		return (slug) => blogs.value.find((blog) => blog.slug === slug);
	});

	const getBlogsByTag = computed(() => {
		return (tagId) => blogs.value.filter((blog) => blog.tags.includes(tagId));
	});

	const getBlogsByCategory = computed(() => {
		return (categoryId) =>
			blogs.value.filter((blog) => blog.category === categoryId);
	});

	const getBlogByCategory = computed(() => {
		return (categoryId) =>
			blogs.value.find((blog) => blog.category === categoryId);
	});

	const isReadyToFetch = computed(() => {
		return status.value === 'idle' || status.value === 'succeeded';
	});

	return {
		status,
		blogs,
		addExtractedBlogs,
		addExtractedBlog,
		addFetchedBlogs,
		isReadyToFetch,
		getLatestBlogs,
		getBlogById,
		getBlogBySlug,
		getBlogsByTag,
		getBlogsByCategory,
		getBlogByCategory,
		filterNewBlogs,
		totalPublishedBlogs,
		initializeTotalPublishedBlogs,
		paginatedBlogs,
		addBlogBySlug,
	};
});
