<template>
	<div v-for="item of questions" :key="item.question">
		<FAQ-item :question="item.question" :answer="item.answer" />
	</div>
</template>

<script>
import { FAQItem } from './FAQItem';

export default {
	name: 'FAQItemGroup',
	components: {
		FAQItem,
	},
};
</script>
