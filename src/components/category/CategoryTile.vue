<template>
	<a :href="`category/${categorySlug}`" class="category-link">
		<div class="category-tile">
			<div class="category-content-wrapper">
				<div
					class="category-background primary-bg"
					:style="{ backgroundImage: categoryImageString }"
				/>
				<div class="category-information">
					<h1 class="category-title accent-color">
						{{ categoryName }}
					</h1>
					<div class="category-details">
						<p v-if="categoryDesc">{{ categoryDesc }}</p>
						<span class="category-details__total-blogs highlight-color">
							<el-icon class="highlight-color">
								<Document />
							</el-icon>
							{{ totalBlogs }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</a>
</template>

<script>
import { getAuthorImageUrl } from '@/api/authorService';
import { computed } from 'vue';
import { ElIcon } from 'element-plus';

export default {
	name: 'CategoryTile',
	components: {
		ElIcon,
	},
	props: {
		categoryName: {
			type: String,
			required: true,
		},
		categorySlug: {
			type: String,
			required: true,
		},
		categoryDesc: {
			type: String,
		},
		categoryImageId: {
			type: String,
		},
		imageSrc: {
			type: String,
		},
		totalBlogs: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const categoryImageSrc = props.categoryImageId
			? getAuthorImageUrl(props.categoryImageId)
			: props.imageSrc;
		const categoryImageString = computed(
			() => `
    linear-gradient(90deg, rgb(39, 40, 41) 55px, rgba(39, 40, 41, 0.48) 251px, rgba(39, 40, 41, 0.24) 341px, rgba(39, 40, 41, 0) 413px), 
    linear-gradient(0deg, rgb(39, 40, 41) 0px, rgba(39, 40, 41, 0.85) 50px, rgba(39, 40, 41, 0) 130px), 
    linear-gradient(180deg, rgb(39, 40, 41) 0px, rgba(39, 40, 41, 0.85) 50px, rgba(39, 40, 41, 0) 130px), 
    url(${categoryImageSrc})
`,
		);
		return {
			categoryImageSrc,
			categoryImageString,
		};
	},
};
</script>

<style scoped>
.category-link {
	text-decoration: none;
}

.category-tile {
	display: block;
	width: 100%;
}

.category-content-wrapper {
	position: relative;
	width: 100%;
	min-height: 200px;
	height: max-content;
}

.category-background {
	border-radius: 3px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: 413px 300px;
	background-position: 100% 50%;
	background-repeat: no-repeat;
	z-index: -1;
}

.category-information {
	color: white;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;
	padding: 2rem;
	text-transform: none;
}

.category-information p {
	text-align: left;
	margin: 1rem 0;
	line-height: 1.5rem;
}

.category-title {
	font-size: 2rem;
}

.category-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.category-details__total-blogs {
	display: inline-flex;
	gap: 5px;
	justify-content: flex-start;
	font-weight: 600;
}
</style>
