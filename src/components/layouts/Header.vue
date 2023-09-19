<template>
	<el-header class="header-layout">
		<el-menu mode="horizontal" class="primary-bg">
			<el-menu-item index="1">
				<router-link to="/">Categories</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link to="/">Blogs</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/">Home</router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link to="/faq">FAQ</router-link>
			</el-menu-item>
			<el-menu-item index="5">
				<router-link to="/about">About author</router-link>
			</el-menu-item>
		</el-menu>
	</el-header>
</template>

<script>
export default {
	name: 'HeaderLayout',
};
</script>

<style scoped>
@import '../../assets/styles/styles.css';

.header-layout {
	flex-shrink: 0;
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
