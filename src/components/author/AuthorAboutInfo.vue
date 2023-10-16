<template>
	<div class="author-info">
		<div class="author-pic-wrapper">
			<div class="primary-bg author-pic-outer-wrapper">
				<div class="author-pic-inner-wrapper">
					<img :src="authorPictureSrc" alt="author-picture" />
				</div>
			</div>
		</div>
		<div class="author-bio-wrapper">
			<div v-dompurify-html="authorAbout" />
		</div>
	</div>
</template>

<script>
import './styles.css';

export default {
	name: 'AuthorAboutInfo',
	props: {
		authorPictureSrc: {
			type: String,
			required: true,
		},
		authorAbout: {
			type: String,
			required: true,
		},
	},
};
</script>
