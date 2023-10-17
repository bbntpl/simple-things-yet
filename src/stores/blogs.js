import { defineStore } from 'pinia';
import { computed, ref, toRaw } from 'vue';

import { fetchPublishedBlogs } from '@/api/blogService';
import { extractIds } from '@/utils/helpers';

// eslint-disable-next-line max-lines-per-function
export const useBlogsStore = defineStore('blogs', () => {
	const blogs = ref([]);

	const status = ref('idle');

	function startFetching() {
		status.value = 'loading';
	}

	function filterNewBlogs(newBlogs) {
		const existingIds = extractIds(blogs.value.map(toRaw));
		return newBlogs.filter((blog) => !existingIds.some((id) => id === blog.id));
	}

	async function addBlogs(newBlogs, queries = {}) {
		startFetching();

		try {
			// If blogs to be added are passed, filter fresh ids and add it
			if (newBlogs) {
				blogs.value.push(...filterNewBlogs(newBlogs));
			} else {
				// Otherwise, fetch blogs by api request and push it
				const fetchedBlogs = await fetchPublishedBlogs({
					...queries,
					excludeIds: extractIds(blogs.value.map(toRaw)),
					category: 1,
				});

				blogs.value.push(...fetchedBlogs);
			}
			status.value = 'succeeded';
		} catch (err) {
			status.value = 'failed';
			console.log('Failed to fetch set of blogs', err.message);
			throw err;
		}
	}

	const getLatestBlogs = computed(() => {
		return (length) => {
			const newestBlogs = blogs.value.sort(
				(a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
			);

			return newestBlogs.slice(0, length);
		};
	});

	const getBlogById = computed(() => {
		return (id) => blogs.value.find((blog) => blog.id === id);
	});

	function isDataEmpty() {
		return !blogs.value;
	}

	function isReadyForFetch() {
		return status.value === 'idle';
	}

	return {
		status,
		blogs,
		addBlogs,
		isReadyForFetch,
		isDataEmpty,
		getLatestBlogs,
		getBlogById,
		filterNewBlogs,
	};
});
