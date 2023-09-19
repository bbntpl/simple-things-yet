<template>
	<el-footer class="light-bg">
		<div class="divider" />
		<div class="footer-content">
			<div class="footer-content__upper">
				<img
					class="logo"
					src="../../../assets/images/sty_logo.svg"
					alt="logo"
				/>
				<div class="footer-links"></div>
			</div>
		</div>
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

import './FooterLayout.css';
import '../../../assets/styles/styles.css';

library.add(faInstagram, faTwitter);

export default {
	name: 'FooterLayout',
	components: {
		FontAwesomeIcon,
	},
	setup() {
		const year = ref(new Date().getFullYear());
		return { year };
	},
};
</script>
