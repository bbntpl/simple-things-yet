<template>
	<div class="blog-card-wrapper">
		<div :class="`blog-card--${size}`">
			<a :href="`${urlRoot}/blog/${blog.id}`">
				<div class="blog-thumbnail">
					<img :src="blogImageSrc" :alt="blog.title" />
				</div>
			</a>
			<div>
				<span :class="`blog-details ${blogStyles.detailsColorClass}`">
					<p v-if="variantType === 'Full' || variantType === 'TitleDescDate'">
						{{ blogPublishedDate }}
					</p>
					<p
						:class="`${blogStyles.detailsColorClass}`"
						v-if="variantType === 'Full'"
					>
						- STY/{{ blog.category.name }}
					</p>
				</span>
				<a :href="`${urlRoot}/blog/${blog.id}`" class="blog-title">
					<h1 :class="`${blogStyles.titleColorClass}`">
						{{ blog.title }}
					</h1>
				</a>
				<div v-if="variantType === 'Full'">
					{{ blog.comments.length }} comments
				</div>
				<p
					v-if="variantType !== 'TitleOnly'"
					:class="`blog-content ${blogStyles.descColorClass}`"
				>
					{{ blogPreviewDesc }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

import './styles.css';
import { formatDateInTimeZone } from '@/utils/date.js';
import { extractTextFromStringifiedHTML } from '@/utils/helpers.js';
import { getBlogImageUrl } from '@/api/blogService';

export default {
	name: 'BlogCard',
	props: {
		blog: {
			type: Object,
			required: true,
		},
		blogStyles: {
			type: Object,
			required: true,
		},
		size: {
			type: String,
			required: true,
			default: 'medium',
			validator: (sizeType) => {
				const sizeTypes = ['small', 'medium', 'large'];
				return sizeTypes.some((size) => sizeType === size);
			},
		},
		variantType: {
			type: String,
			required: true,
			default: 'Full',
			validator: (variantType) => {
				const validVariantTypes = [
					'Full',
					'TitleDesc',
					'TitleDescDate',
					'TitleOnly',
				];
				return validVariantTypes.some((type) => variantType === type);
			},
		},
	},
	setup(props) {
		const blogImageSrc = ref(null);
		const blogPreviewDesc = ref('');

		onMounted(() => {
			if (blogImageSrc.value === null) {
				blogImageSrc.value = getBlogImageUrl(props.blog.imageId);
			}
			if (props.blog?.content && props.variantType !== 'TitleOnly') {
				blogPreviewDesc.value = `${extractTextFromStringifiedHTML(
					props.blog.content,
					300,
				)}...`;
			}
		});

		return {
			blogImageSrc,
			blogPreviewDesc,
			blogPublishedDate: formatDateInTimeZone(props.blog.publishedAt),
			urlRoot: computed(() => process.env.VUE_APP_BASE_URL),
		};
	},
};
</script>
