<template>
	<TagsCollection :tags="tags" :collapseText="`Blog Tags (${tags?.length})`" />
	<h1
		:style="{
			margin: '36px 0 0 0',
			fontWeight: 'bold',
			fontSize: '2rem',
		}"
	>
		Recent Blogs
	</h1>
	<BlogsCollection
		v-if="typeof totalPublishedBlogs === 'number'"
		:blogs="blogs"
		:totalPublishedBlogs="totalPublishedBlogs"
	/>
</template>

<script>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useTagsStore } from '@/stores/tags';
import { useBlogsStore } from '@/stores/blogs';
import TagsCollection from '@/components/tag/TagsCollection';
import BlogsCollection from '@/components/blog/BlogsCollection';
import { execInit } from '@/utils/helpers';

export default {
	name: 'BlogListView',
	components: {
		TagsCollection,
		BlogsCollection,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const tagsStore = useTagsStore();
		const blogsStore = useBlogsStore();

		const { tags } = storeToRefs(tagsStore);
		const { blogs } = storeToRefs(blogsStore);
		const { totalPublishedBlogs } = storeToRefs(blogsStore);

		const getPromises = async () => {
			const promises = [];

			if (tagsStore.isReadyToFetch) {
				promises.push(tagsStore.addAllTags());
			}

			if (!blogsStore.totalPublishedBlogs) {
				promises.push(blogsStore.initializeTotalPublishedBlogs());
			}

			if (blogs.value.length === 0) {
				promises.push(
					blogsStore.addFetchedBlogs({
						limit: 1,
						sort: 'latest',
					}),
				);
			}

			return Promise.all(promises);
		};

		onMounted(async () => {
			const promises = getPromises();
			if (promises.length === 0) return;

			const resolvePromises = async () => await promises;
			await execInit(resolvePromises);
		});

		return {
			tags: computed(() => tags.value),
			blogs: computed(() => blogs.value),
			totalPublishedBlogs: computed(() => totalPublishedBlogs.value),
		};
	},
};
</script>
