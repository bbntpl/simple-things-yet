<template>
	<MainWrapper>
		<div class="blog-intro">
			<h1 class="home-title">A Personal Blog</h1>
			<p class="home-author secondary-text">By {{ authorName }}</p>
		</div>
		<div class="divider" />
		<BlogSection
			headerText="Latest Blogs"
			:sectionStyles="{
				bgColorClass: '',
				headerTextColorClass: 'secondary-text',
			}"
		>
			<BlogCard
				v-for="(blog, index) in latestBlogs"
				:key="`latest_${blog.id}`"
				:variantType="index === 0 ? 'Full' : 'TitleOnly'"
				:size="index === 0 ? 'large' : 'medium'"
				:blog="blog"
				:blogStyles="{
					titleColorClass: 'primary-text',
					descColorClass: 'shark-text',
					detailsColorClass: 'shark-text',
				}"
			/>
		</BlogSection>
		<BlogSection
			v-for="(category, categoryIndex) in categoriesToShowcase"
			headerText="Latest Blogs"
			:sectionStyles="{
				...homepageSectionsStyles[categoryindex].sectionStyles,
			}"
			:key="category.name"
		>
			<BlogCard
				v-for="(blog, index) in category.publishedBlogs"
				:key="`latest_${blog.id}`"
				:variantType="index === 0 ? 'Full' : 'TitleOnly'"
				:size="index === 0 ? 'large' : 'medium'"
				:blog="blog"
				:blogStyles="{ ...homepageSectionsStyles[categoryIndex].blogStyles }"
			/>
		</BlogSection>
	</MainWrapper>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import './styles.css';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import BlogCard from '@/components/blog/BlogCard';
import BlogSection from '@/components/blog/BlogSection.vue';
import { useBlogsStore } from '@/stores/blogs';
import { useAuthorStore } from '@/stores/author';
import { useCategoriesStore } from '@/stores/categories';
import { execInit } from '@/utils/helpers';
import { homepageSectionsStyles } from '@/data/homepage';

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
		const { blogs } = storeToRefs(blogsStore);

		const latestBlogs = ref([]);
		const categoriesToShowcase = ref([]);
		const authorName = ref(author.value?.name || '');

		watch(author, (updatedAuthor) => {
			authorName.value = updatedAuthor.name;
		});

		watch(
			categoriesStore.getCategoriesWithEmbeddedBlogs(),
			(updatedCategories) => {
				categoriesToShowcase.value.push(...updatedCategories);
			},
			{ deep: true },
		);

		watch(
			blogs,
			(updatedBlogs) => {
				latestBlogs.value.push(...updatedBlogs);
			},
			{ deep: true },
		);

		function setupPromises() {
			const promises = [];

			if (authorStore.isReadyForFetch()) {
				promises.push(authorStore.initializeAuthor());
			}

			if (blogsStore.isReadyForFetch()) {
				promises.push(
					blogsStore.addBlogs(null, {
						sort: 'latest',
					}),
				);
			}

			if (categoriesStore.isReadyForFetch()) {
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
			console.log(promises);
			if (promises.length === 0) return;

			const resolvePromises = async () => {
				await Promise.all(promises);
			};

			await execInit(resolvePromises, {
				errorMsg: 'Something wrong happened during data fetch',
			});
		});

		return {
			latestBlogs,
			authorName,
			categoriesToShowcase,
			homepageSectionsStyles,
		};
	},
};
</script>
