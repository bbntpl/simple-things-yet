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
import './styles.css';

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
