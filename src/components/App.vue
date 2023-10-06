<template>
	<el-container id="app-container" direction="vertical">
		<Header />
		<main class="main-content">
			<router-view />
		</main>
		<Footer />
	</el-container>
</template>

<script>
import { ElContainer } from 'element-plus';
import { onMounted } from 'vue';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

import { useAuthorStore } from '@/stores/author';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
		ElContainer,
	},
	setup() {
		const { initializeAuthor } = useAuthorStore();

		onMounted(async () => {
			const fetchedAuthor = await initializeAuthor();
			console.log(fetchedAuthor);
		});
	},
};
</script>

<style>
* {
	box-sizing: border-box;
}

#app {
	font-family: 'Noto Sans', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
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
