<template>
	<MainWrapper>
		<div id="blog-categories">
			<h1 class="primary-text">Blog Categories</h1>
			<div class="category-tiles">
				<CategoryTile
					v-for="category in categories"
					:key="category.id"
					:totalBlogs="category.publishedBlogs.length"
					:categoryName="category.name"
					:categorySlug="category.slug"
					:categoryDesc="category.description"
					:categoryImageId="category.imageId"
				/>
				<CategoryTile
					v-if="totalUncategorizedBlogs > 0"
					key="unset-category"
					:totalBlogs="totalUncategorizedBlogs"
					categoryName="Uncategorized"
					categorySlug="uncategorized"
					categoryDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					:imageSrc="UncategorizedImage"
				/>
			</div>
		</div>
	</MainWrapper>
</template>

<script>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch, computed } from 'vue';
import UncategorizedImage from '@/assets/images/cat_uncategorized.jpg';

import { fetchTotalPublishedBlogsWithUnsetCategory } from '@/api/blogService';
import MainWrapper from '@/components/layouts/MainWrapper';
import { useCategoriesStore } from '@/stores/categories';
import CategoryTile from '@/components/category/CategoryTile';
import { execInit } from '@/utils/helpers';

export default {
	name: 'BlogCategoriesView',
	components: {
		CategoryTile,
		MainWrapper,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const categoriesStore = useCategoriesStore();

		const { categories, sortedCategoriesByNameAsc } =
			storeToRefs(categoriesStore);
		const allCategories = ref(sortedCategoriesByNameAsc || []);
		const totalUncategorizedBlogs = ref(0);

		watch(
			categories,
			(updatedCategories) => {
				allCategories.value.push(...updatedCategories);
			},
			{ deep: true },
		);

		async function fetchDataAndSet() {
			await categoriesStore.addCategories({ limit: 50 });
		}

		onMounted(async () => {
			if (categoriesStore.isDataReady()) {
				await execInit(fetchDataAndSet, {
					errMsg: 'Something went wrong when fetching categories',
				});
			}

			if (totalUncategorizedBlogs.value === 0) {
				const response = await fetchTotalPublishedBlogsWithUnsetCategory();
				totalUncategorizedBlogs.value = response.blogsLength;
			}
		});

		return {
			categories: computed(() => allCategories.value),
			UncategorizedImage,
			totalUncategorizedBlogs,
		};
	},
};
</script>

<style scoped>
#blog-categories > h1 {
	text-transform: uppercase;
	font-size: clamp(1rem, 2.5vw, 4rem);
	font-weight: bold;
}
.category-tiles {
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem 15px;
	margin: 3rem 0;
}

@media (min-width: 768px) {
	.category-tiles {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
