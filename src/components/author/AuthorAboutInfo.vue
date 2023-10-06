<template>
	<div class="author-info">
		<div v-if="authorPictureSrc !== null" class="author-pic-wrapper">
			<div class="primary-bg author-pic-outer-wrapper">
				<div class="author-pic-inner-wrapper">
					<img :src="authorPictureSrc" alt="author-picture" />
				</div>
			</div>
		</div>
		<div v-if="authorAbout !== null" class="author-bio-wrapper">
			<div v-dompurify-html="authorAbout" />
		</div>
	</div>
</template>

<script>
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
<style scoped>
.author-info {
	display: flex;
	justify-content: center;
	align-self: center;
	gap: 2rem;
}
.author-bio-wrapper {
	flex: 4;
	line-height: 2rem;
}

.author-pic-wrapper {
	flex: 2;
	display: flex;
	justify-content: flex-end;
}

.author-pic-outer-wrapper {
	width: 420px;
	height: 420px;
	border-radius: 50%;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
}

.author-pic-inner-wrapper {
	width: 400px;
	height: 400px;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: -2px 2px 1px 1px rgba(141, 136, 2, 0.8);
}

.author-pic-inner-wrapper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
