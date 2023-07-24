<template>
	<div v-if="loggedAuthor === null">
		<router-view></router-view>
	</div>
	<div v-else>
		<blog-header></blog-header>
		<layout class="responsive-layout">
			<router-view></router-view>
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

export default {
	components: {
		BlogHeader,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const loggedAuthor = ref(store.getters.selectLoggedAuthor);

		const isCurrentlyIndexPage = () => {
			return route.path === '/' || route.path === '/dashboard';
		};

		const navigate = (route) => {
			router.go(route);
		};

		onMounted(() => {
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
				}
			);

			return () => {
				axios.interceptors.response.eject(interceptor);
			};
		});

		return {
			loggedAuthor,
			isCurrentlyIndexPage,
			navigate,
		};
	},
};
</script>
