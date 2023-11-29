<template>
	<div
		v-if="blogArticle.data && !blogArticle.doesNotExists"
		class="blog-article"
	>
		<p>{{ blogArticle.data.title }}</p>
		<p>
			{{ blogArticle.data.slug }}
		</p>
	</div>
	<div v-else-if="blogArticle.doesNotExists">
		This blog does not exists yet.
	</div>
</template>

<script>
import { onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { useBlogsStore } from '@/stores/blogs';
import { useCategoriesStore } from '@/stores/categories';
import { useTagsStore } from '@/stores/tags';
import { useImageDocsStore } from '@/stores/image-docs';
import { execInit } from '@/utils/helpers';

export default {
	name: 'BlogPage',
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const blogsStore = useBlogsStore();
		const categoriesStore = useCategoriesStore();
		const tagsStore = useTagsStore();
		const imageDocsStore = useImageDocsStore();
		const route = useRoute();

		const blogSlug = route.params.slug;
		const blog = reactive({
			data: null,
			doesNotExists: false,
			category: null,
			categoryImageUrl: null,
			imageUrl: null,
			tags: [],
		});

		// Once the promises, gets resolved, update the blog object
		watchEffect(() => {
			if (blog.data === null) return;
			const categoryDoc = categoriesStore.getCategoryById(blog.data.category);
			async () => await fetchImageDocByIdAndSet(categoryDoc.imageFile);

			if (!categoryDoc) return;
			blog.category = categoryDoc.name;
		});

		watchEffect(() => {
			if (blog.data === null) return;
			const imageDoc = imageDocsStore.getImageDocById(blog.data.imageFile);

			if (!imageDoc) return;
			blog.imageUrl = imageDoc.imageUrl;
		});

		watchEffect(() => {
			if (blog.data === null || !blog.category) return;
			const categoryDoc = categoriesStore.getCategoryById(blog.data.category);
			const imageDoc = imageDocsStore.getImageDocById(categoryDoc.imageFile);
			console.log(categoryDoc, imageDoc);

			if (!imageDoc) return;
			blog.categoryImageUrl = imageDoc.imageUrl;
		});

		watchEffect(() => {
			if (blog.data === null) return;
			const areTagsFetched = tagsStore.areTagsInStore(blog.data.tags);

			if (!areTagsFetched) return;
			for (const tagId of blog.data.tags) {
				const tagDoc = tagsStore.getTagById(tagId);
				blog.tags.push(tagDoc.slug);
			}
		});

		const validateFetchedBlogAndGet = () => {
			const fetchedBlog = blogsStore.getBlogBySlug(blogSlug);
			if (!fetchedBlog) {
				blog.doesNotExists = true;
				return null;
			} else {
				blog.data = fetchedBlog;
				return fetchedBlog;
			}
		};

		const fetchBlogBySlugAndSet = async () => {
			return await blogsStore.addBlogBySlug(blogSlug);
		};

		const fetchCategoryByIdAndSet = async (categoryId) => {
			if (!categoriesStore.getCategoryById(categoryId)) {
				await categoriesStore.addCategoryById(categoryId);
			}
		};

		const fetchImageDocByIdAndSet = async (imageId) => {
			if (!imageDocsStore.getImageDocById(imageId)) {
				await imageDocsStore.addImageDocById(imageId);
			}
		};

		const fetchTagsByIdAndSet = async (tagIds) => {
			// Iterate tags to check if at least one tag is not yet fetched then fetch if it is
			for (const id of tagIds) {
				const tagDoc = tagsStore.getTagById(id);
				if (!tagDoc) {
					await tagsStore.addTagById(id);
				}
			}
		};

		const fetchDocsByRefsAndGetPromises = async () => {
			const promises = [];
			const fetchedBlog = validateFetchedBlogAndGet();
			if (!fetchedBlog || fetchedBlog === null) return promises;

			promises.push(fetchCategoryByIdAndSet(fetchedBlog.category));
			promises.push(fetchTagsByIdAndSet(fetchedBlog.tags));
			promises.push(fetchImageDocByIdAndSet(fetchedBlog.imageFile));
			return promises;
		};

		onMounted(async () => {
			// check if blog exists already on the store, if not, fetch it then set; otherwise, there's no need
			if (!blogsStore.getBlogBySlug(blogSlug)) {
				await execInit(fetchBlogBySlugAndSet);
			}

			const promises = fetchDocsByRefsAndGetPromises();
			if (promises.length === 0) return;
			const resolvePromises = async () => await promises;
			await execInit(resolvePromises);
		});

		return { blogArticle: blog };
	},
};
</script>
