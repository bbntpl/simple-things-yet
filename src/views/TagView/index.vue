<template>
	<div v-if="tag.data && !tag.doesNotExists && tag.blogs.length > 0">
		<h1
			:style="{
				margin: '36px 0 0 0',
				fontWeight: 'bold',
				fontSize: '2rem',
			}"
		>
			Blogs under tag [{{ tag.data.name }}]
		</h1>
		<BlogsCollection
			v-if="tag.data.publishedBlogs.length > 0"
			:blogs="tag.blogs"
			:totalPublishedBlogs="tag.data.publishedBlogs.length"
			:queries="{ tags: [tag.data.id] }"
		/>
	</div>
	<p v-else-if="tag.doesNotExists">This tag does not exists</p>
</template>

<script>
import { onMounted, reactive, watchEffect, unref } from 'vue';
import { useRoute } from 'vue-router';

import { useTagsStore } from '@/stores/tags';
import { useBlogsStore } from '@/stores/blogs';
import BlogsCollection from '@/components/blog/BlogsCollection';
import { execInit } from '@/utils/helpers';

export default {
	name: 'TagView',
	components: {
		BlogsCollection,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const route = useRoute();
		const tagsStore = useTagsStore();
		const blogsStore = useBlogsStore();
		const tagSlug = route.params.slug;

		const tag = reactive({
			data: null,
			doesNotExists: false,
			blogs: [],
		});

		watchEffect(() => {
			if (tag.data === null) return;
			const blogs = blogsStore.getBlogsByTag(tag.data.id);

			if (blogs.length > 0) {
				tag.blogs = unref(blogs);
			}
		});

		// Fetch the tag if it doesn't exist
		const fetchTagBySlugAndSet = async () => {
			return await tagsStore.addTagBySlug(tagSlug);
		};

		const getPromises = async () => {
			const promises = [];
			const fetchedTag = tagsStore.getTagBySlug(tagSlug);
			if (!fetchedTag) {
				tag.doesNotExists = true;
				return promises;
			}

			const blogs = blogsStore.getBlogsByTag(fetchedTag.id);
			tag.data = fetchedTag;

			if (fetchedTag && blogs && blogs.length === 0) {
				promises.push(
					blogsStore.addFetchedBlogs({
						limit: 2,
						sort: 'latest',
						tags: [tag.data.id],
					}),
				);
			}

			return Promise.all(promises);
		};

		onMounted(async () => {
			// check if tag exists already, if so, get it, otherwise, fetch it and set
			if (!tagsStore.getTagBySlug(tagSlug)) {
				await execInit(fetchTagBySlugAndSet);
			}

			const promises = getPromises();
			if (promises.length === 0) return;
			const resolvePromises = async () => await promises;
			await execInit(resolvePromises);
		});

		return { tag };
	},
};
</script>
