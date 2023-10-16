<template>
	<div :class="`blogs-section ${sectionStyles.bgColorClass}`">
		<h1 :class="`${sectionStyles.headerTextColorClass}`">
			{{ headerText }}
		</h1>
		<div class="blogs-collection">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'BlogSection',
	components: {},
	props: {
		sectionStyles: {
			required: true,
			type: Object,
		},
		headerText: {
			required: true,
			type: String,
		},
	},
};
</script>

<style scoped>
.blogs-section {
	padding: 2rem 0;
	width: 100%;
	max-width: 100%;
}

.blogs-section div {
	max-width: 100%;
}

.blogs-section > h1 {
	font-size: clamp(1.4rem, 2vw, 3.5rem);
	text-transform: uppercase;
	margin-top: 5px;
	margin-bottom: 10px;
	font-weight: 600;
}

.blogs-collection {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
}
</style>
