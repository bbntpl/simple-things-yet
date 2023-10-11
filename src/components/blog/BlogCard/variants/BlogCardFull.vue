<template>
	<div class="blog-card--full">
		<div class="blog-thumbnail">
			<img :src="blogImageSrc" :alt="blog.title" />
		</div>
		<div>
			<span> {{ blog.publishedAt }} - STY/{{ blog.category.name }} </span>
			<div>{{ blog.title }}</div>
			<div>{{ blog.comments.length }} comments</div>
			<div>{{ blog.desc }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BlogCardFull',
	props: {
		blog: {
			type: Object,
			required: true,
		},
		blogImageSrc: {
			type: String,
			required: true,
		},
	},
};
</script>
