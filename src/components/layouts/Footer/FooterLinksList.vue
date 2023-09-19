<template>
	<el-footer-links-list> </el-footer-links-list>
</template>

<script>
export default {
	name: 'FooterLinksList',
	props: {
		label: String,
		items: {
			type: Array,
			default: () => [],
			validator: function (items) {
				return items.every((item) => {
					return typeof item.name === 'string' && typeof item.link === 'string';
				});
			},
		},
	},
};
</script>
