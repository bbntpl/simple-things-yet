import { fetchAuthor } from '@/api/authorService';
import { defineStore } from 'pinia';

export const useAuthorStore = defineStore('author', {
	state: () => ({
		data: null,
		isFetching: false,
		error: null,
	}),
	actions: {
		startFetching() {
			this.isFetching = true;
			this.error = null;
		},
		async initializeAuthor() {
			this.startFetching();
			try {
				const fetchedAuthor = await fetchAuthor();
				this.data = fetchedAuthor;
				return fetchedAuthor;
			} catch (error) {
				this.error = error;
				console.error('Failed to fetch author:', error);
			} finally {
				this.isFetching = false;
			}
		},
	},
	getters: {
		getAuthor() {
			return this.data;
		},
	},
});
