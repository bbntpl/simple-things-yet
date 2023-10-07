import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchAuthor } from '@/api/authorService';

// eslint-disable-next-line max-lines-per-function
export const useAuthorStore = defineStore('author', () => {
	const author = ref(null);
	const isFetching = ref(false);
	const error = ref(null);

	function startFetching() {
		isFetching.value = true;
		error.value = null;
	}

	async function initializeAuthor() {
		startFetching();
		try {
			const fetchedAuthor = await fetchAuthor();
			author.value = fetchedAuthor;
		} catch (error) {
			error.value = error;
			console.error('Failed to fetch author:', error);
		} finally {
			isFetching.value = false;
		}
	}

	function isDataReady() {
		return author.value && !isFetching.value && !error.value;
	}

	return {
		author,
		isFetching,
		error,
		isDataReady,
		initializeAuthor,
	};
});
