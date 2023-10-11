<template>
	<div>Hey blogs should be dislayed here</div>
	<h1>Recent Blogs</h1>
	<!-- <div>
		<ul>
			<li v-for="(blog, index) in blogs" :key="index">
				{{ blog.title }}
			</li>
		</ul>
	</div> -->
	<button v-bind="navigateToBlogs">Browse all blogs</button>
</template>

<script>
// import { BlogCard } from '@/components/blog/BlogCard.vue';

export default {
	name: 'BlogListView',
};
</script>
