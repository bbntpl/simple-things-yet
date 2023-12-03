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
				:size="index === 0 || latestBlogs.length === 2 ? 'large' : 'medium'"
				:blog="blog"
				:blogStyles="{
					...homepageSectionsStyles[1].blogStyles,
				}"
			/>
		</BlogSection>
		<a
			v-if="latestBlogs.length > 0"
			class="el-button blogs-btn"
			href="./#/blogs"
			>Browse all blogs</a
		>
		<div v-if="!categories.doesNotExists && categories.data.length > 0">
			<BlogSection
				v-for="(category, categoryIndex) in categories.data"
				:headerText="category.name"
				:sectionStyles="{
					...homepageSectionsStyles[categoryIndex].sectionStyles,
				}"
				:key="category.name"
			>
				<BlogCard
					v-for="blog in category.publishedBlogs"
					:v-if="typeof blog !== 'string'"
					:key="`category_${blog.id}`"
					variantType="TitleDesc"
					size="large"
					:blog="blog"
					:blogStyles="{ ...homepageSectionsStyles[categoryIndex].blogStyles }"
				/>
			</BlogSection>
		</div>
	</MainWrapper>
</template>

<script>
import { onMounted, ref, watch, computed, reactive } from 'vue';
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
// import { fetchPublishedBlogById } from '@/api/blogService';

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
		const categories = reactive({
			data: [],
			doesNotExists: false,
		});

		watch(author, (updatedAuthor) => {
			authorName.value = updatedAuthor.name;
		});

		watch(categoriesWithEmbeddedBlogs, (updatedCategoriesWithEmbeddedBlogs) => {
			if (updatedCategoriesWithEmbeddedBlogs.length > 0) {
				categories.data = updatedCategoriesWithEmbeddedBlogs;
				categories.doesNotExists = false;
				// updatedCategoriesWithEmbeddedBlogs.forEach((category) => {
				// 	category.publishedBlogs.forEach((blog) => {
				// 		if (typeof blog === 'string' || typeof blog === 'number') {
				// 			if (!blogsStore.getBlogById(blog)) {
				// 				fetchPublishedBlogById(blog).then((result) => {
				// 					blogsStore.addExtractedBlogs(result);
				// 				});
				// 			}
				// 		}
				// 	});
				// });
			} else {
				categories.doesNotExists = true;
			}
		});

		function setupPromises() {
			const promises = [];

			if (authorStore.isReadyToFetch) {
				promises.push(authorStore.initializeAuthor());
			}

			if (blogsStore.isReadyToFetch) {
				promises.push(
					blogsStore.addFetchedBlogs({
						limit: 5,
						sort: 'latest',
					}),
				);
			}

			if (categoriesStore.isReadyToFetch) {
				promises.push(
					categoriesStore.addCategoriesWithLatestBlogs({
						limit: 4,
						sort: 'larger',
					}),
				);
			}

			return Promise.all(promises);
		}

		// Resolve promises for necessary data initialization
		onMounted(async () => {
			const promises = setupPromises();
			if (promises.length === 0) return;

			const resolvePromises = async () => await promises;
			await execInit(resolvePromises, {
				errorMsg: 'Something went wrong during data fetch',
			});
		});

		return {
			latestBlogs: computed(() => getLatestBlogs.value(5)),
			authorName,
			categories,
			homepageSectionsStyles,
		};
	},
};
</script>
