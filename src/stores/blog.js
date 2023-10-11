import { fetchPublishedBlogs } from '@/api/blogService';
import { ElLoading } from 'element-plus';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// eslint-disable-next-line max-lines-per-function
export const useBlogsStore = defineStore('blogs', () => {
	const blogs = ref([]);

	const loadingInstance = ref(null);
	const status = ref('idle');
	const error = ref(null);

	function startFetching() {
		status.value = 'loading';
		loadingInstance.value = ElLoading.service({
			lock: true,
			fullscreen: true,
			text: 'Loading...',
		});
	}

	function closeLoading() {
		if (!loadingInstance.value) return;
		loadingInstance.value.close();
		loadingInstance.value = null;
	}

	function extractBlogsIds() {
		if (blogs.value.length === 0) return [];
		return blogs.value.map((blog) => blog.id);
	}

	async function addBlogs(queries = {}) {
		startFetching();
		try {
			const fetchedBlogs = await fetchPublishedBlogs({
				...queries,
				excludeIds: extractBlogsIds(),
				category: 1,
			});
			blogs.value.push(...fetchedBlogs);
			status.value === 'succeeded';
			return fetchedBlogs;
		} catch (err) {
			error.value === err;
			status.value === 'failed';
			console.log('Failed to fetch set of blogs', err.message);
		} finally {
			closeLoading();
		}
	}

	function isReadyForFetch() {
		return (
			(status.value !== 'loading' || !status.value !== 'failed') &&
			!loadingInstance.value &&
			!error.value
		);
	}

	return {
		addBlogs,
		isReadyForFetch,
		status,
		error,
	};
});
