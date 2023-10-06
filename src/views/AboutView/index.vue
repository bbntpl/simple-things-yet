<template>
	<div class="about">
		<AuthorAboutInfo
			:authorPictureSrc="authorPictureSrc"
			:authorAbout="authorAbout"
		/>
		<AuthorContactForm :authorEmail="authorEmail" />
	</div>
</template>

<script>
import { reactive, watchEffect } from 'vue';

import { useAuthorStore } from '@/stores/author';
import { fetchAuthorImageUrl } from '@/api/authorService';
import AuthorAboutInfo from '@/components/author/AuthorAboutInfo.vue';
import AuthorContactForm from '@/components/author/AuthorContactForm.vue';

export default {
	name: 'AboutView',
	components: {
		AuthorAboutInfo,
		AuthorContactForm,
	},
	setup() {
		const { author, isDataReady } = useAuthorStore();

		const authorData = reactive({
			bioHtml: null,
			imageSrc: null,
			email: null,
		});

		watchEffect(() => {
			if (isDataReady) {
				authorData.bioHtml = author.bio;
				authorData.email = author.email;
				authorData.imageSrc = fetchAuthorImageUrl(author.imageId);
			}
		});

		return {
			authorPictureSrc: authorData.imageSrc,
			authorAbout: authorData.bioHtml,
			authorEmail: authorData.email,
			isDataReady,
		};
	},
};
</script>
