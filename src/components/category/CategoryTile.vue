<template>
	<div v-if="totalBlogs > 0" class="category-tile">
		<div>
			<div class="category-tile__bg" />
			<div class="category-tile__content">
				<h1 class="category-title">
					{{ categoryTitle }}
				</h1>
				<div class="category-info">
					<p v-if="categoryDesc">{{ categoryDesc }}</p>
					<p>{{ totalBlogs }} blogs</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CategoryTile',
	props: {
		categoryTitle: {
			type: String,
			required: true,
		},
		categoryDesc: {
			type: String,
		},
		categoryImgSrc: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.category-tile__bg {
	border-radius: 3px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #3a3a3a;
	background-size: 344px 250px !important;
	background-position: 100% 50% !important;
	background-repeat: no-repeat !important;
}
</style>
