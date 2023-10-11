<template>
	<MainWrapper>
		<div class="about">
			<AuthorAboutInfo
				:authorPictureSrc="authorPictureSrc"
				:authorAbout="authorAbout"
			/>
			<AuthorContactForm />
		</div>
	</MainWrapper>
</template>

<script>
import { reactive, watchEffect } from 'vue';

import { useAuthorStore } from '@/stores/author';
import { getAuthorImageUrl } from '@/api/authorService';
import AuthorAboutInfo from '@/components/author/AuthorAboutInfo.vue';
import AuthorContactForm from '@/components/author/AuthorContactForm.vue';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import { storeToRefs } from 'pinia';

export default {
	name: 'AboutView',
	components: {
		AuthorAboutInfo,
		AuthorContactForm,
		MainWrapper,
	},
	setup() {
		const authorStore = useAuthorStore();
		const { author } = storeToRefs(authorStore);

		const authorData = reactive({
			bioHtml: null,
			imageSrc: null,
			email: null,
		});

		watchEffect(() => {
			if (authorStore.isDataReady()) {
				authorData.bioHtml = author.value.bio;
				authorData.email = author.value.email;
				authorData.imageSrc = getAuthorImageUrl(author.value.imageId);
			}
		});

		return {
			authorPictureSrc: authorData.imageSrc,
			authorAbout: authorData.bioHtml,
		};
	},
};
</script>
