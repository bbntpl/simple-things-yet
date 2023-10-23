<template>
	<TagsCollection :tags="tags" :collapseText="`Blog Tags (${tags?.length})`" />
	<BlogsCollection :blogs="blogs" />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTagsStore } from '@/stores/tags';
import { useBlogsStore } from '@/stores/blogs';
import TagsCollection from '@/components/tag/TagsCollection';
import { execInit } from '@/utils/helpers';

export default {
	name: 'BlogListView',
	components: {
		TagsCollection,
		// BlogsCollectionWithPagination,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const tagsStore = useTagsStore();
		const blogsStore = useBlogsStore();

		const { tags } = storeToRefs(tagsStore);
		const { totalPublishedBlogs, paginatedBlogs } = storeToRefs(blogsStore);
		const blogs = ref(paginatedBlogs.value(0, 8) || []);

		const getPromises = async () => {
			const promises = [];

			if (tagsStore.isReadyToFetch) {
				promises.push(tagsStore.addAllTags());
			}

			if (blogsStore.totalPublishedBlogs) {
				promises.push(blogsStore.initializeTotalPublishedBlogs);
			}

			promises.push(
				blogsStore.addFetchedBlogs({
					skip: 0,
					limit: 8,
				}),
			);
		};

		onMounted(async () => {
			const promises = getPromises();

			const resolvePromises = await Promise.all(promises);
			const result = await execInit(resolvePromises, {
				errorMsg: 'Something went wrong when fetching the blogs',
			});
			console.log(result);
		});

		return {
			tags: computed(() => tags.value),
			blogs: computed(() => blogs.value),
			totalPublishedBlogs: computed(() => totalPublishedBlogs),
		};
	},
};
</script>
