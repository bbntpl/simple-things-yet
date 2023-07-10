<template>
	<el-footer class="blog-theme-primary">
		<div class="social-icons">
			<a href="https://www.instagram.com/SimpleThingsYet" target="_blank">
				<font-awesome-icon icon="fab fa-instagram" />
			</a>
			<a href="https://twitter.com/SimpleThingsYet" target="_blank">
				<font-awesome-icon icon="fab fa-twitter" />
			</a>
		</div>
		<div class="copyright">&copy; {{ year }} SimpleThingsYet</div>
	</el-footer>
</template>

<script>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/custom-theme.css';

library.add(faInstagram, faTwitter);

export default {
	name: 'BlogFooter',
	components: {
		FontAwesomeIcon,
	},
	setup() {
		const year = ref(new Date().getFullYear());
		return { year };
	},
};
</script>

<style scoped>
.el-footer {
	display: flex;
	justify-content: space-between;
	padding: 20px;
}

.social-icons a {
	margin-right: 10px;
	color: #f7f7ee;
}

.copyright {
	color: #f7f7ee;
}
</style>
