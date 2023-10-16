import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchAuthor } from '@/api/authorService';

// eslint-disable-next-line max-lines-per-function
export const useAuthorStore = defineStore('author', () => {
	const author = ref(null);

	const status = ref('idle');

	function startLoading() {
		status.value = 'loading';
	}

	async function initializeAuthor() {
		startLoading();
		try {
			const fetchedAuthor = await fetchAuthor();
			author.value = fetchedAuthor;
			status.value === 'succeeded';
			return fetchedAuthor;
		} catch (err) {
			status.value === 'failed';
			console.error('Failed to fetch author:', err.message);
		}
	}

	function isReadyForFetch() {
		return status.value === 'idle';
	}

	return {
		author,
		isReadyForFetch,
		initializeAuthor,
	};
});
