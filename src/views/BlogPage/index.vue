<template>
	<MainWrapper>
		<div
			v-if="blogArticle.data && !blogArticle.doesNotExists"
			class="blog-page"
		>
			<img
				className="category-image"
				:src="blogArticle.categoryImageUrl"
				alt="category"
			/>
			<img className="blog-image" :src="blogArticle.imageUrl" alt="blog" />
			<div className="ql-snow blog-article primary-color">
				<h1>{{ blogArticle.data.title }}</h1>
				<div
					className="ql-editor"
					v-dompurify-html="blogArticle.data.content"
				/>
			</div>
			<div className="tag-links" v-if="blogArticle.tags.length > 0">
				<h6>Tags:</h6>
				<a
					v-for="tag in blogArticle.tags"
					:key="tag"
					:href="`${urlRoot}/#/tag/${tag}`"
				>
					<el-tag type="success">
						{{ tag }}
					</el-tag>
				</a>
			</div>
		</div>
		<div v-else-if="blogArticle.doesNotExists">
			This blog does not exists yet.
		</div>
	</MainWrapper>
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import './styles.css';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import { ElTag } from 'element-plus';

import { useBlogsStore } from '@/stores/blogs';
import { useCategoriesStore } from '@/stores/categories';
import { useTagsStore } from '@/stores/tags';
import { useImageDocsStore } from '@/stores/image-docs';
import { execInit } from '@/utils/helpers';
import { ElMessage } from 'element-plus';

export default {
	name: 'BlogPage',
	components: {
		MainWrapper,
		ElTag,
	},
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
		watchEffect(async () => {
			if (blog.data === null) return;
			const categoryDoc = categoriesStore.getCategoryById(blog.data.category);

			if (!categoryDoc) return;
			try {
				await fetchImageDocByIdAndSet(categoryDoc.imageFile);
				blog.category = categoryDoc.name;
			} catch (error) {
				ElMessage.error('Error fetching category image document');
			}
		});

		watchEffect(() => {
			if (blog.data === null) return;
			const imageDoc = imageDocsStore.getImageDocById(blog.data.imageFile);

			if (!imageDoc) return;
			blog.imageUrl = imageDoc.imageUrl;
		});

		watchEffect(() => {
			if (blog.data !== null && blog.category !== null) {
				const categoryDoc = categoriesStore.getCategoryById(blog.data.category);
				const imageDoc = imageDocsStore.getImageDocById(categoryDoc.imageFile);

				if (!imageDoc) return;
				blog.categoryImageUrl = imageDoc.imageUrl;
			}
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
			const areTagsFetched = tagsStore.areTagsInStore(tagIds);
			if (areTagsFetched) return;
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

		return {
			blogArticle: blog,
			urlRoot: computed(() => process.env.VUE_APP_BASE_URL),
		};
	},
};
</script>

<style>
@import 'https://unpkg.com/@vueup/vue-quill@1.0.0-beta.9/dist/vue-quill.snow.css';
</style>
