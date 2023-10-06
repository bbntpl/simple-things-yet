<template>
	<main-wrapper>
		<div class="faq-header">
			<div class="faq-intro">
				<h1>You have questions?</h1>
				<h2>Here are my responses.</h2>
			</div>
			<el-input
				:prefix-icon="Search"
				v-model="searchQuery"
				placeholder="Search for a question..."
			/>
		</div>
		<div
			class="faq-group-wrapper"
			v-for="section in filteredFaqSections"
			:key="section.title"
		>
			<h2 class="faq-section-title">{{ section.title }}</h2>
			<FAQ-item-group :faqSection="section" />
		</div>
	</main-wrapper>
</template>

<script>
import { ref, computed } from 'vue';
import { ElInput } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

import FAQItemGroup from '@/components/faq/FAQItemGroup.vue';
import MainWrapper from '@/components/layouts/MainWrapper.vue';
import faqSectionsData from '../../data/faqs';

export default {
	name: 'FAQView',
	components: {
		MainWrapper,
		FAQItemGroup,
		ElInput,
	},
	setup() {
		const searchQuery = ref('');
		const filteredFaqSections = computed(() => {
			if (!searchQuery.value) return faqSectionsData;

			return faqSectionsData.map((section) => {
				return {
					title: section.title,
					faqs: section.faqs.filter((faq) =>
						faq.question
							.toLowerCase()
							.includes(searchQuery.value.toLowerCase()),
					),
				};
			});
		});

		return { filteredFaqSections, searchQuery, Search };
	},
};
</script>

<style scoped>
.faq-header {
	display: flex;
	flex-direction: column;
	padding: 32px 0px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	align-self: stretch;
}
.faq-intro {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	font-size: 36px;
	font-weight: 300;
	margin-bottom: 2rem;
}

.faq-group-wrapper {
	width: 100%;
	margin: 2rem 0;
}
.faq-section-title {
	font-size: 28px;
	margin-bottom: 0.8rem;
	text-align: left;
}

.el-input {
	width: 100%;
	max-width: 568px;
}
</style>
