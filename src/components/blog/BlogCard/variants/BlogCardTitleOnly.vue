<template>
	<div class="blog-thumbnail">
		<img :src="blogImageSrc" :alt="blog.title" />
	</div>
	<div>{{ blog.title }}</div>
</template>

<script>
export default {
	name: 'BlogCardTitleOnly',
	props: {
		blog: {
			type: Object,
			required: true,
		},
		blogImageSrc: {
			type: Object,
			required: true,
		},
	},
};
</script>
