import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import { fetchAuthor } from '@/api/authorService';
import { ElLoading } from 'element-plus';

// eslint-disable-next-line max-lines-per-function
export const useAuthorStore = defineStore('author', () => {
	const author = ref(null);
	const status = reactive({
		loadingInstance: null,
		error: null,
		isFetched: false,
	});

	function closeLoading() {
		if (!status.loadingInstance) return;
		status.loadingInstance.close();
		status.loadingInstance = null;
	}

	function startLoading() {
		status.loadingInstance = ElLoading.service({
			lock: true,
			fullscreen: true,
			text: 'Loading...',
		});
	}

	async function initializeAuthor() {
		startLoading();
		try {
			const fetchedAuthor = await fetchAuthor();
			author.value = fetchedAuthor;
			status.isFetched = true;
		} catch (error) {
			status.error = error;
			console.error('Failed to fetch author:', error.message);
		} finally {
			closeLoading();
		}
	}

	function isDataReady() {
		return status.isFetched && !status.loadingInstance && !status.error;
	}

	return {
		author,
		isDataReady,
		initializeAuthor,
	};
});
