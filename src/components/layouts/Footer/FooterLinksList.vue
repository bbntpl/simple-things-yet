<template>
	<ul class="footer-links-list">
		<li class="links-list-label">{{ label }}</li>
		<li v-for="item in items" :key="item.name" class="links-list-item">
			<el-link :href="item.url">{{ item.name }}</el-link>
		</li>
	</ul>
</template>

<script>
import { ElLink } from 'element-plus';

export default {
	name: 'FooterLinksList',
	components: {
		ElLink,
	},
	props: {
		label: String,
		items: {
			type: Array,
			default: () => [],
			validator: function (items) {
				return items.every((item) => {
					return typeof item.name === 'string' && typeof item.url === 'string';
				});
			},
		},
	},
};
</script>
<style scoped>
.footer-links-list {
	list-style-type: none;
}
</style>
