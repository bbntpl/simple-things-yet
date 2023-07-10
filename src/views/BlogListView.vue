<template>
	<div>Hey blogs should be dislayed here</div>
	<h1>Recent Blogs</h1>
	<div>
		<ul>
			<li v-for="(blog, index) in blogs" :key="index">
				{{ blog.title }}
			</li>
		</ul>
	</div>
</template>

<script>
import { useBlogStore } from '@/stores/blog';
import { fetchPublishedBlogs } from '@/services/blogService';
// import { BlogCard } from '@/components/blog/BlogCard.vue';

export default {
	name: 'BlogListView',
	setup() {
		const store = useBlogStore();
		fetchPublishedBlogs.then((data) => {
			store.initializeBlogList(data);
		});

		return {
			blogs: store.blogList,
		};
	},
};
</script>
