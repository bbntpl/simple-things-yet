<template>
	<el-container id="app-container" direction="vertical">
		<Header />
		<el-main class="main-content">
			<router-view />
		</el-main>
		<Footer />
	</el-container>
</template>

<script>
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
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

#app-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.el-menu--horizontal {
	justify-content: center !important;
}

.main-content {
	flex: 1;
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
