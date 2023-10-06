import { fetchAuthor } from '@/api/authorService';
import { defineStore } from 'pinia';

export const useAuthorStore = defineStore('author', {
	state: () => ({
		author: null,
	}),
	actions: {
		async initializeAuthor() {
			try {
				const fetchedAuthor = await fetchAuthor();
				this.author = fetchedAuthor;
				return fetchedAuthor;
			} catch (error) {
				console.error('Failed to fetch author:', error);
			}
		},
	},
	getters: {
		getAuthor() {
			return this.author;
		},
	},
});
