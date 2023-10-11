import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { ElLoading } from 'element-plus';

import { fetchCategories } from '@/api/categoryService';

// eslint-disable-next-line max-lines-per-function
export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref([]);

	const status = reactive({
		loadingInstance: null,
		error: null,
		isFetched: false,
	});

	function startLoading() {
		status.loadingInstance = ElLoading.service({
			lock: true,
			fullscreen: true,
			text: 'Loading...',
		});
	}

	function closeLoading() {
		if (!status.loadingInstance) return;
		status.loadingInstance.close();
		status.loadingInstance = null;
	}

	async function addCategories(queries) {
		startLoading();
		try {
			const fetchedCategories = await fetchCategories(queries);
			categories.value.push(...fetchedCategories);
			status.isFetched = true;
		} catch (err) {
			status.error = err;
			console.error('Failed to fetch set of categories', err);
		} finally {
			closeLoading();
		}
	}

	function isDataReady() {
		return status.isFetched && !status.loadingInstance && !status.error;
	}

	return {
		categories,
		addCategories,
		isDataReady,
	};
});
