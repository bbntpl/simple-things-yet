import { defineStore } from 'pinia';

const useBlogStore = defineStore('blog', {
	state: () => {
		return {
			blogList: [],
			blog: null,
		};
	},
	actions: {
		initializeBlogList(newBlogList) {
			this.blogList = newBlogList;
		},
	},
});

export { useBlogStore };
