<template>
	<div v-if="loggedAuthor === null">
		<RouterView />
	</div>
	<div v-else>
		<BlogHeader />
		<layout class="responsive-layout">
			<RouterView />
		</layout>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import axios from 'axios';

import { isTokenExpiredError } from '../../services/api';
import BlogHeader from '../../components/NavHeader';

function handleMount({ router, store }) {
	const logoutWhenTokenExpires = () => {
		store.dispatch('logoutAuthor');
		router.push('/login');
	};

	const interceptor = axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (isTokenExpiredError(error)) {
				logoutWhenTokenExpires();
				throw new Error('Token expired');
			} else if (
				!!error?.response?.data?.errors ||
				!!error?.response?.data?.error
			) {
				return error.response;
			} else {
				throw new Error(error?.response?.data?.message || error.message);
			}
		},
	);

	return () => axios.interceptors.response.eject(interceptor);
}

export default {
	components: {
		BlogHeader,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const loggedAuthor = ref(store.getters.selectLoggedAuthor);

		const isIndexPage = () => route.path === '/' || route.path === '/dashboard';
		const navigate = (route) => router.go(route);

		onMounted(() => {
			handleMount({ store, router });
		});

		return {
			loggedAuthor,
			isIndexPage,
			navigate,
		};
	},
};
</script>
