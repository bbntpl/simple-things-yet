<template>
	<el-container id="app-container" direction="vertical">
		<Header ref="headerRef" />
		<main class="main-content" :style="{ minHeight: mainComputedHeight }">
			<RouterView />
		</main>
		<Footer ref="footerRef" />
	</el-container>
</template>

<script>
import { ElContainer } from 'element-plus';
import { onMounted, ref, watchEffect } from 'vue';

import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

import { useAuthorStore } from '@/stores/author';
import { storeToRefs } from 'pinia';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
		ElContainer,
	},
	setup() {
		const authorStore = useAuthorStore();
		const { isDataReady } = storeToRefs(authorStore);
		const headerRef = ref(null);
		const footerRef = ref(null);
		const mainComputedHeight = ref(0);

		onMounted(async () => {
			if (!isDataReady) {
				await authorStore.initializeAuthor();
			}
		});

		watchEffect(() => {
			const headerHeight = headerRef.value
				? headerRef.value.$el.offsetHeight
				: 0;
			const footerHeight = footerRef.value
				? footerRef.value.$el.offsetHeight
				: 0;
			if (headerHeight || footerHeight) {
				mainComputedHeight.value = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
			}
		});

		return { headerRef, footerRef, mainComputedHeight };
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
	justify-content: center;
	align-items: center;
}

.el-menu--horizontal {
	justify-content: center !important;
}

.main-content {
	flex: 1;
	width: 100%;
	max-width: var(--max-width);
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
