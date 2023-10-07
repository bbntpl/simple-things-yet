<template>
	<div id="blog-categories">
		<h1>Blog Categories</h1>
		<CategoryTile
			v-for="category in categories"
			:key="category.id"
			:totalBlogs="category.blogs.length"
			:categoryTitle="category.title"
			:categoryDesc="category.desc"
			:categoryImageId="category.imageId"
		/>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';

import { useCategoriesStore } from '@/stores/categories';
import CategoryTile from '@/components/category/CategoryTile';

export default {
	name: 'BlogCategoriesView',
	components: {
		CategoryTile,
	},
	setup() {
		const categoriesStore = useCategoriesStore();
		const { categories } = storeToRefs(categoriesStore);

		const allCategories = ref([]);

		onMounted(async () => {
			if (categories.value.length === 0) {
				await categoriesStore.addCategories();
			}
		});

		watchEffect(() => {
			if (categoriesStore.isDataReady) {
				allCategories.value.push(...categories.value);
			}
		});

		return {
			categories: allCategories,
		};
	},
};
</script>
