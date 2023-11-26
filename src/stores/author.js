import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { fetchAuthor } from '@/api/authorService';

export const useAuthorStore = defineStore('author', () => {
	const author = ref(null);
	const status = ref('idle');

	async function initializeAuthor() {
		status.value = 'loading';
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

	const isReadyToFetch = computed(() => {
		return status.value === 'idle';
	});

	return {
		author,
		isReadyToFetch,
		initializeAuthor,
	};
});
