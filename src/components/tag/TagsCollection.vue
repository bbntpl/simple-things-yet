<template>
	<el-collapse v-if="tags?.length > 0" class="tags-collapse">
		<el-collapse-item :title="collapseText">
			<a
				v-for="tag in tags"
				:key="tag.name"
				:href="`${urlRoot}/#/tag/${tag.slug}`"
			>
				<el-tag type="success">
					{{ `${tag.name} ${tag.publishedBlogs.length}` }}
				</el-tag>
			</a>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
import { ElCollapse, ElCollapseItem, ElTag } from 'element-plus';
import { computed } from 'vue';

export default {
	name: 'TagsCollection',
	components: {
		ElCollapse,
		ElCollapseItem,
		ElTag,
	},
	props: {
		tags: {
			type: Array,
			required: true,
		},
		collapseText: {
			type: String,
			default: '',
		},
	},
	setup() {
		return {
			urlRoot: computed(() => process.env.VUE_APP_BASE_URL),
		};
	},
};
</script>

<style>
.el-collapse-item__content {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
</style>
