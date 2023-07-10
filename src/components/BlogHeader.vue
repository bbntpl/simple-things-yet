<template>
	<el-header>
		<el-menu mode="horizontal" class="blog-theme-primary">
			<el-menu-item index="1">
				<router-link to="/">Blogs</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link to="/about">About Me</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/contact-page">Contacts</router-link>
			</el-menu-item>
		</el-menu>
	</el-header>
</template>

<script>
export default {
	name: 'BlogHeader',
};
</script>

<style scoped>
@import '../assets/styles/custom-theme.css';

.el-header {
	line-height: 60px;
	padding: 0 0;
}

.el-menu {
	height: 100%;
}

.el-menu-item {
	color: #f7f7ee;
}
</style>
