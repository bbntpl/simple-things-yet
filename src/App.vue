<template>
	<el-container class="container" direction="vertical">
		<BlogHeader />
		<el-main class="main-content">
			<router-view />
		</el-main>
		<BlogFooter />
	</el-container>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
import BlogFooter from '@/components/BlogFooter.vue';

export default {
	name: 'App',
	components: {
		BlogHeader,
		BlogFooter,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.el-menu--horizontal {
	justify-content: center !important;
}

.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.main-content {
	flex: 1 0 auto;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
