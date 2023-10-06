<template>
	<transition name="fade">
		<el-alert
			v-if="showAlert"
			title="success alert"
			type="success"
			center
			show-icon
			class="absolute-alert"
		/>
	</transition>
	<el-form
		:model="form"
		action="https://api.web3forms.com/submit"
		method="POST"
		:disabled="formIsDisabled"
		class="author-contact-form"
		label-position="top"
	>
		<input type="hidden" name="replyto" :value="authorEmail" />
		<input
			type="hidden"
			name="access_key"
			value="7f07f98b-1c7b-47bb-a4ac-917a2e43b47c"
		/>
		<el-form-item label="Your email" prop="email">
			<el-input v-model="form.email" />
		</el-form-item>
		<el-form-item label="Subject" prop="subject">
			<el-input v-model="form.subject" />
		</el-form-item>
		<el-form-item label="Your message" prop="message">
			<el-input v-model="form.message" type="textarea" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="handleSubmit">Submit</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
	name: 'ContactAuthorForm',
	props: {
		authorEmail: {
			type: String,
		},
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const showAlert = ref(false);
		const formIsDisabled = ref(false);
		const form = reactive({
			email: '',
			subject: '',
			message: '',
		});
		const rules = reactive({
			email: [
				{ required: true, message: 'Email is required', trigger: 'blur' },
				{
					type: 'email',
					message: 'Please enter a valid email',
					trigger: ['blur', 'change'],
				},
			],
			subject: [
				{ required: true, message: 'Subject is required', trigger: 'blur' },
			],
			message: [
				{ required: true, message: 'Message is required', trigger: 'blur' },
			],
		});

		const handleSubmit = () => {
			form.validate((valid) => {
				if (valid) {
					showAlert.value = true;
					formIsDisabled.value = true;

					setTimeout(() => {
						showAlert.value = false;
						formIsDisabled.value = false;
					}, 5000);
				} else {
					console.log('Form validation failed');
				}
			});
		};

		return { form, rules, showAlert, formIsDisabled, handleSubmit };
	},
};
</script>

<style scoped>
.author-contact-form {
	width: 100%;
	max-width: 768px;
}
.absolute-alert {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
