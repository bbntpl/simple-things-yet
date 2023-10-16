import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchPublishedBlogs } from '@/api/blogService';

// eslint-disable-next-line max-lines-per-function
export const useBlogsStore = defineStore('blogs', () => {
	const blogs = ref([]);

	const status = ref('idle');

	function startFetching() {
		status.value = 'loading';
	}

	function extractBlogsIds(blogs) {
		if (blogs.length === 0) return [];
		return new Set(blogs.map((blog) => blog.id));
	}

	function filterExistingBlogs(newBlogs) {
		const existingBlogsIds = extractBlogsIds(blogs.value);
		return newBlogs.filter((blog) => !existingBlogsIds.has(blog.id));
	}

	async function addBlogs(newBlogs, queries = {}) {
		startFetching();
		try {
			// If blogs to be added are passed, filter fresh ids and add it
			if (newBlogs) {
				blogs.value.push(filterExistingBlogs(newBlogs));
			} else {
				// Otherwise, fetch blogs by api request and push it
				const fetchedBlogs = await fetchPublishedBlogs({
					...queries,
					excludeIds: extractBlogsIds(blogs.value),
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

	function getLatestBlogs(length) {
		const newestBlogs = blogs.value.sort(
			(a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
		);

		return newestBlogs.slice(0, length - 1);
	}

	function isDataEmpty() {
		return !blogs.value;
	}

	function isReadyForFetch() {
		return status.value === 'idle';
	}

	return {
		addBlogs,
		isReadyForFetch,
		isDataEmpty,
		status,
		blogs,
		getLatestBlogs,
	};
});
