<template>
	<MainWrapper>
		<div class="about">
			<AuthorAboutInfo
				v-if="authorPictureSrc !== null && authorAbout !== null"
				:authorPictureSrc="authorPictureSrc"
				:authorAbout="authorAbout"
			/>
			<AuthorContactForm />
		</div>
	</MainWrapper>
</template>

<script>
import { watch, onMounted, reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuthorStore } from '@/stores/author';
import { getAuthorImageUrl } from '@/api/authorService';
import AuthorAboutInfo from '@/components/author/AuthorAboutInfo.vue';
import AuthorContactForm from '@/components/author/AuthorContactForm.vue';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import { execInit } from '@/utils/helpers';

export default {
	name: 'AboutView',
	components: {
		AuthorAboutInfo,
		AuthorContactForm,
		MainWrapper,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const authorStore = useAuthorStore();

		const { author } = storeToRefs(authorStore);
		const authorData = reactive({
			bioHtml: author.value?.bio || null,
			imageSrc: author.value?.imageId
				? getAuthorImageUrl(author.value.imageId)
				: null,
			email: author.value?.email || null,
		});

		watch(author, (updatedAuthor) => {
			authorData.bioHtml = updatedAuthor.bio || null;
			authorData.email = updatedAuthor.email || null;
			authorData.imageSrc = updatedAuthor.imageId
				? getAuthorImageUrl(updatedAuthor.imageId)
				: null;
		});

		onMounted(async () => {
			if (authorStore.isReadyToFetch) {
				await execInit(authorStore.initializeAuthor, {
					errorMsg: 'Something wrong happened during data fetch',
				});
			}
		});

		return {
			authorPictureSrc: computed(() => authorData.imageSrc),
			authorAbout: computed(() => authorData.bioHtml),
		};
	},
};
</script>
