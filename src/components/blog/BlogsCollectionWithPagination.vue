import { ref, computed } from 'vue'; import homepageSectionsStyles from
'@/data/homepage';
<template>
	<h1>{{ headerText }}</h1>
	<ul class="blogs-collection" :infinite-scroll-disabled="disabled">
		<BlogSection
			v-infinite-scroll="load"
			v-if="blogs.length"
			headerText="Latest Blogs"
			:sectionStyles="{
				...homepageSectionsStyles[1].sectionStyles,
			}"
		>
			<BlogCard
				v-for="blog in blogs"
				:key="`blog_${blog.id}`"
				variantType="TitleDescDate"
				size="medium"
				:blog="blog"
				:blogStyles="{
					...homepageSectionsStyles[1].blogStyles,
				}"
			/>
		</BlogSection>
		<p v-if="loading">Loading...</p>
		<p v-if="noMore">No more</p>
	</ul>
</template>

<script>
import { ref, computed } from 'vue';

import homepageSectionsStyles from '@/data/homepage';
import { execInit } from '@/utils/helpers';
import { useBlogsStore } from '@/stores/blogs';

export default {
	name: 'BlogsCollectionWithPagination',
	props: {
		blogs: {
			type: Array,
			required: true,
		},
		totalPublishedBlogs: Number,
	},
	// eslint-disable-next-line max-lines-per-function
	setup(props) {
		const blogsStore = useBlogsStore();
		const ITEM_PER_LOAD = 2;

		const blogsToDisplay = ref(props.initialBlogs || []);
		const loading = ref(false);
		const count = ref(0);
		const noMore = computed(
			() => count.value >= props.totalPublishedBlogs - props.initialBlogs,
		);
		const disabled = computed(() => loading.value || noMore.value);

		const load = () => {
			loading.value = true;
			setTimeout(() => {
				count.value += ITEM_PER_LOAD;
				execInit(
					blogsStore.addFetchedBlogs({
						skip: count.value / ITEM_PER_LOAD,
						limit: ITEM_PER_LOAD,
					}),
				);
			}, 1100);
		};

		return {
			load,
			disabled,
			blogsToDisplay,
			homepageSectionsStyles,
		};
	},
};
</script>
