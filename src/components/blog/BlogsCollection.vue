<template>
	<div>
		<ul class="blogs-collection">
			<BlogSection
				v-if="blogs.length > 0"
				headerText=""
				:sectionStyles="{
					...homepageSectionsStyles[1].sectionStyles,
				}"
			>
				<BlogCard
					v-for="blog in blogsToShow"
					:key="`blog_${blog.id}`"
					variantType="TitleDescDate"
					size="large"
					:blog="blog"
					:blogStyles="{
						...homepageSectionsStyles[1].blogStyles,
					}"
				/>
			</BlogSection>
			<p v-else-if="numOfBlogs === 0">There are no published blogs yet</p>
			<el-button
				v-if="!fullyFetched || !disabled"
				@click="load"
				:disabled="disabled"
				:loading="loading"
			>
				Load more
			</el-button>
		</ul>
	</div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { ElButton } from 'element-plus';

import homepageSectionsStyles from '@/data/homepage';
import BlogCard from '@/components/blog/BlogCard';
import BlogSection from '@/components/blog/BlogSection';
import { execInit } from '@/utils/helpers';
import { useBlogsStore } from '@/stores/blogs';
import { storeToRefs } from 'pinia';

export default {
	name: 'BlogsCollection',
	components: {
		ElButton,
		BlogSection,
		BlogCard,
	},
	props: {
		blogs: {
			type: Array,
			required: true,
		},
		totalPublishedBlogs: {
			default: null,
			type: Number,
		},
		queries: {
			type: Object,
		},
	},
	// eslint-disable-next-line max-lines-per-function
	setup(props) {
		const blogsStore = useBlogsStore();
		const ITEM_PER_LOAD = 2;

		const { status } = storeToRefs(blogsStore);
		const blogsToShow = ref(props.blogs || []);
		const loading = ref(false);
		const noMore = computed(
			() => props.totalPublishedBlogs <= blogsToShow.value.length,
		);
		const fullyFetched = computed(
			() => blogsToShow.value.length === props.totalPublishedBlogs,
		);
		const disabled = computed(
			() => loading.value || noMore.value || fullyFetched.value,
		);

		watchEffect(() => {
			if (fullyFetched.value) {
				status.value = 'fully-fetched';
			}

			if (props.blogs.length > blogsToShow.value.length) {
				blogsToShow.value = props.blogs;
			}
		});

		async function fetchBlogAndAdd() {
			return await blogsStore.addFetchedBlogs({
				limit: ITEM_PER_LOAD,
				sort: 'latest',
				...(props.queries ? { ...props.queries } : {}),
			});
		}

		const load = () => {
			loading.value = true;
			setTimeout(async () => {
				await execInit(fetchBlogAndAdd);
				loading.value = false;
			}, 500);
		};

		return {
			load,
			disabled,
			loading,
			blogsToShow,
			homepageSectionsStyles,
			numOfBlogs: props.totalPublishedBlogs,
			fullyFetched,
		};
	},
};
</script>
