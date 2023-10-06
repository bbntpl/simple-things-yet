<template>
	<el-collapse>
		<el-collapse-item
			v-for="item of faqSection.faqs"
			:title="item.question"
			:key="item.question"
		>
			<div
				class="faq-response-paragraph"
				v-for="(paragraph, index) in item.responses"
				:key="`${faqSection.title}${index}`"
			>
				{{ paragraph }}
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
import { ElCollapse, ElCollapseItem } from 'element-plus';

export default {
	name: 'FAQItemGroup',
	components: {
		ElCollapse,
		ElCollapseItem,
	},
	props: {
		faqSection: {
			type: Object,
			default: () => ({
				title: '',
				faqs: [],
			}),
			validator: function (faqSection) {
				return (
					typeof faqSection.title === 'string' && Array.isArray(faqSection.faqs)
				);
			},
		},
	},
};
</script>

<style scoped>
.el-collapse-item__header {
	font-weight: 700;
}
.faq-response-paragraph {
	width: 100%;
	text-align: left;
	word-wrap: break-word;
}
</style>
