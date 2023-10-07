import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchCategories } from '@/api/categoryService';

// eslint-disable-next-line max-lines-per-function
export const useCategoriesStore = defineStore('categories', () => {
	const categories = ref([]);
	const isFetching = ref(false);
	const error = ref(null);

	async function addCategories(queries) {
		isFetching.value = true;
		try {
			const fetchedCategories = await fetchCategories(queries);
			categories.value.push(...fetchedCategories);
		} catch (err) {
			error.value = err;
			console.error('Failed to fetch set of categories', error);
		} finally {
			isFetching.value = false;
		}
	}

	function isDataReady() {
		return !isFetching.value && !error.value;
	}

	return {
		categories,
		isFetching,
		error,
		addCategories,
		isDataReady,
	};
});
