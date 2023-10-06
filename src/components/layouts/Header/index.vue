<template>
	<div class="header-layout">
		<div class="logo-wrapper">
			<img class="logo" src="../../../assets/images/sty_logo.svg" alt="logo" />
		</div>
		<el-menu mode="horizontal" class="nav-menu" :default-active="$route.path">
			<el-menu-item index="/blog-categories">
				<router-link to="/blog-categories">Categories</router-link>
			</el-menu-item>
			<el-menu-item index="/blogs">
				<router-link to="/blogs">Blogs</router-link>
			</el-menu-item>
			<el-menu-item index="/">
				<router-link to="/">
					<el-icon>
						<HomeFilled
							v-if="$route.path === '/' || $route.path === '/dashboard'"
						/>
						<House v-else />
					</el-icon>
				</router-link>
			</el-menu-item>
			<el-menu-item index="/faq">
				<router-link to="/faq">FAQ</router-link>
			</el-menu-item>
			<el-menu-item index="/about">
				<router-link to="/about">About author</router-link>
			</el-menu-item>
		</el-menu>
		<div class="divider" />
	</div>
</template>

<script>
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus';

import './HeaderLayout.css';

export default {
	name: 'HeaderLayout',
	components: {
		ElIcon,
		ElMenu,
		ElMenuItem,
	},
};
</script>
