<template>
	<MainWrapper>
		<div
			v-if="blogArticle.data && !blogArticle.doesNotExists"
			class="blog-page"
		>
			<div
				className="category-image"
				:style="{
					backgroundImage: `linear-gradient(rgba(255,255,255,.69), rgba(255,255,255,.69)), url(${blogArticle.categoryImageDoc.imageUrl})`,
				}"
			>
				<img
					className="blog-image"
					:src="blogArticle.imageDoc.imageUrl"
					alt="blog"
				/>
			</div>
			<p
				v-if="
					blogArticle.imageDoc.credit.authorName &&
					blogArticle.imageDoc.credit.authorURL &&
					blogArticle.categoryImageDoc.credit.authorName &&
					blogArticle.categoryImageDoc.credit.authorURL
				"
			>
				Photos by
				<a :href="blogArticle.imageDoc.credit.authorURL">{{
					blogArticle.imageDoc.credit.authorName
				}}</a>
				and
				<a :href="blogArticle.categoryImageDoc.credit.authorURL">{{
					blogArticle.categoryImageDoc.credit.authorName
				}}</a>
			</p>
			<p
				v-else-if="
					blogArticle.imageDoc.credit.authorName &&
					blogArticle.imageDoc.credit.authorURL
				"
			>
				Photo by
				<a :href="blogArticle.imageDoc.credit.authorURL">{{
					blogArticle.imageDoc.credit.authorName
				}}</a>
			</p>
			<div className="ql-snow blog-article primary-color">
				<div className="blog-article-header">
					<h1 className="blog-article-title">{{ blogArticle.data.title }}</h1>
					<div className="blog-article-details">
						<p className="blog-author">
							Author:
							<a className="blog-author-link" :href="`${urlRoot}/#/about`">
								{{ blogArticle.author }}
							</a>
						</p>
						<p className="blog-category-date">
							{{ blogArticle.category }} / {{ blogPublishedDate }}
						</p>
					</div>
				</div>
				<el-divider />
				<article
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

<!-- eslint-disable max-lines -->
<script>
import { computed, onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ElTag, ElMessage, ElDivider } from 'element-plus';

import './styles.css';
import MainWrapper from '@/components/layouts/MainWrapper.vue';

import { useBlogsStore } from '@/stores/blogs';
import { useCategoriesStore } from '@/stores/categories';
import { useTagsStore } from '@/stores/tags';
import { useAuthorStore } from '@/stores/author';
import { useImageDocsStore } from '@/stores/image-docs';
import { execInit } from '@/utils/helpers';
import { formatDateInTimeZone } from '@/utils/date.js';

export default {
	name: 'BlogPage',
	components: {
		MainWrapper,
		ElTag,
		ElDivider,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const blogsStore = useBlogsStore();
		const authorStore = useAuthorStore();
		const categoriesStore = useCategoriesStore();
		const tagsStore = useTagsStore();
		const imageDocsStore = useImageDocsStore();
		const route = useRoute();

		const blogSlug = route.params.slug;
		const blog = reactive({
			author: null,
			category: null,
			categoryImageDoc: null,
			data: null,
			doesNotExists: false,
			imageDoc: null,
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
			if (blog.data === null || authorStore.author === null) return;
			blog.author = authorStore.author.name;
		});

		watchEffect(() => {
			if (blog.data === null) return;
			const imageDoc = imageDocsStore.getImageDocById(blog.data.imageFile);

			if (!imageDoc) return;
			blog.imageDoc = imageDoc;
		});

		watchEffect(() => {
			if (blog.data !== null && blog.category !== null) {
				const categoryDoc = categoriesStore.getCategoryById(blog.data.category);
				const imageDoc = imageDocsStore.getImageDocById(categoryDoc.imageFile);

				if (!imageDoc) return;
				blog.categoryImageDoc = imageDoc;
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

			if (authorStore.isReadyToFetch) {
				promises.push(authorStore.initializeAuthor());
			}
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
			blogPublishedDate: computed(() =>
				formatDateInTimeZone(blog.data.publishedAt),
			),
			urlRoot: computed(() => process.env.VUE_APP_BASE_URL),
		};
	},
};
</script>

<style>
@import 'https://unpkg.com/@vueup/vue-quill@1.0.0-beta.9/dist/vue-quill.snow.css';
</style>
