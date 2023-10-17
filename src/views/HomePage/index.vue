<template>
	<MainWrapper>
		<div class="blog-intro">
			<h1 class="home-title">A Personal Blog</h1>
			<p class="home-author secondary-color">By {{ authorName }}</p>
		</div>
		<div class="divider" />
		<BlogSection
			v-if="latestBlogs.length"
			headerText="Latest Blogs"
			:sectionStyles="{
				bgColorClass: '',
				headerTextColorClass: 'secondary-color',
			}"
		>
			<BlogCard
				v-for="(blog, index) in latestBlogs"
				:key="`latest_${blog.id}`"
				:variantType="index === 0 ? 'Full' : 'TitleDescDate'"
				:size="index === 0 ? 'large' : 'medium'"
				:blog="blog"
				:blogStyles="{
					...homepageSectionsStyles[1].blogStyles,
				}"
			/>
		</BlogSection>
		<a class="el-button blogs-btn" href="./#/blogs">Browse all blogs</a>
		<BlogSection
			v-for="(category, categoryIndex) in categoriesToShowcase"
			:headerText="category.name"
			:sectionStyles="{
				...homepageSectionsStyles[categoryIndex].sectionStyles,
			}"
			:key="category.name"
		>
			<BlogCard
				v-for="(blog, index) in category.publishedBlogs"
				:key="`category_${blog.id}`"
				:variantType="index === 0 ? 'TitleDescDate' : 'TitleDesc'"
				size="large"
				:blog="blog"
				:blogStyles="{ ...homepageSectionsStyles[categoryIndex].blogStyles }"
			/>
		</BlogSection>
	</MainWrapper>
</template>

<script>
import { onMounted, ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';

import './styles.css';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import BlogCard from '@/components/blog/BlogCard';
import BlogSection from '@/components/blog/BlogSection';
import { useBlogsStore } from '@/stores/blogs';
import { useAuthorStore } from '@/stores/author';
import { useCategoriesStore } from '@/stores/categories';
import { execInit } from '@/utils/helpers';
import homepageSectionsStyles from '@/data/homepage';

export default {
	name: 'HomePage',
	components: {
		MainWrapper,
		BlogCard,
		BlogSection,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const authorStore = useAuthorStore();
		const blogsStore = useBlogsStore();
		const categoriesStore = useCategoriesStore();

		const { author } = storeToRefs(authorStore);
		const { getLatestBlogs } = storeToRefs(blogsStore);
		const { categoriesWithEmbeddedBlogs } = storeToRefs(categoriesStore);

		const authorName = ref(author.value?.name || '');

		watch(author, (updatedAuthor) => {
			authorName.value = updatedAuthor.name;
		});

		function setupPromises() {
			const promises = [];

			if (authorStore.isReadyForFetch()) {
				promises.push(authorStore.initializeAuthor());
			}

			if (blogsStore.isReadyForFetch()) {
				promises.push(
					blogsStore.addBlogs(null, {
						limit: 5,
						sort: 'latest',
					}),
				);
			}

			if (categoriesStore.isReadyForFetch) {
				promises.push(
					categoriesStore.addCategoriesWithLatestBlogs({
						limit: 4,
						sort: 'larger',
					}),
				);
			}

			return promises;
		}

		// Resolve promises for necessary data initialization
		onMounted(async () => {
			const promises = setupPromises();
			if (promises.length === 0) return;

			const resolvePromises = async () => await Promise.all(promises);
			await execInit(resolvePromises, {
				errorMsg: 'Something wrong happened during data fetch',
			});
		});

		return {
			latestBlogs: computed(() => getLatestBlogs.value(5)),
			authorName,
			categoriesToShowcase: computed(() => categoriesWithEmbeddedBlogs.value),
			homepageSectionsStyles,
		};
	},
};
</script>
