<template>
	<div class="blog-card-wrapper">
		<BlogCardTitleOnly
			v-if="variantType === 'TitleOnly'"
			:blog="blog"
			:blogImageSrc="blogThumbnail"
		/>
		<BlogCardTitleDesc
			v-else-if="variantType === 'TitleDesc'"
			:blog="blog"
			:blogImageSrc="blogThumbnail"
		/>
		<BlogCardTitleDescDate
			v-else-if="variantType === 'TitleDescDate'"
			:blog="blog"
			:blogImageSrc="blogThumbnail"
		/>
		<BlogCardFull
			v-else-if="variantType === 'Full' || variantType === 'Default'"
			:blog="blog"
			:blogImageSrc="blogThumbnail"
		/>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';

import { getBlogImageUrl } from '@/api/blogService';
import BlogCardTitleOnly from './variants/BlogCardTitleOnly.vue';
import BlogCardTitleDesc from './variants/BlogCardTitleDesc.vue';
import BlogCardTitleDescDate from './variants/BlogCardTitleDescDate.vue';
import BlogCardFull from './variants/BlogCardFull.vue';

export default {
	name: 'BlogCard',
	components: {
		BlogCardTitleOnly,
		BlogCardTitleDesc,
		BlogCardTitleDescDate,
		BlogCardFull,
	},
	props: {
		variantType: {
			type: String,
			required: true,
			default: 'Default',
			validator: (variantType) => {
				const validVariantTypes = [
					'Full',
					'Default',
					'TitleDesc',
					'TitleDescDate',
					'TitleOnly',
				];
				return validVariantTypes.some((type) => variantType === type);
			},
		},
		blog: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const blogThumbnail = ref(null);

		onMounted(() => {
			if (blogThumbnail.value === null) {
				blogThumbnail.value = getBlogImageUrl(props.blog.imageId);
			}
		});

		return { blogThumbnail };
	},
};
</script>

<style>
.blog-thumbnail {
	background: #fff;
	overflow: hidden;
	border-radius: 3px;
}

.blog-thumbnail > img {
	width: 100%;
	vertical-align: middle;
}
</style>
