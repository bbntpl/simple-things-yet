<!-- eslint-disable max-lines -->
<template>
	<transition name="fade">
		<el-alert
			v-if="showAlert"
			title="Message successfully sent to the author!"
			type="success"
			center
			show-icon
			class="success-alert"
		/>
	</transition>
	<div class="author-contact-form-wrapper">
		<h2 class="author-contact-form__title primary-text">Contact Me</h2>
		<el-text size="large">
			Please fill up the form below to send me a message.
		</el-text>
		<el-form
			ref="formRef"
			:model="form"
			:disabled="formIsDisabled"
			:rules="rules"
			class="author-contact-form"
			label-position="top"
			@submit.prevent="handleSubmit"
		>
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
				<el-button type="primary" @click="handleSubmit(formRef)"
					>Submit</el-button
				>
				<el-button @click="handleReset(formRef)">Reset</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { reactive, ref } from 'vue';
import { ElText } from 'element-plus';
import './styles.css';
export default {
	name: 'ContactAuthorForm',
	components: {
		ElText,
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const showAlert = ref(false);
		const formIsDisabled = ref(false);
		const formRef = ref();
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

		const handleFormSubmissionSuccess = () => {
			showAlert.value = true;
			formIsDisabled.value = true;
		};

		const resetFormState = () => {
			showAlert.value = false;
			formIsDisabled.value = false;
			handleReset(formRef.value);
		};

		const sendFormData = async (formData) => {
			try {
				const response = await fetch('https://api.web3forms.com/submit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(formData),
				});

				const result = await response.json();
				if (result.success) {
					handleFormSubmissionSuccess();
					setTimeout(() => resetFormState(), 5000);
				} else {
					console.error('API responded with an error:', result.error);
				}
			} catch (error) {
				console.error('Failed to submit the form:', error);
			}
		};

		const validateAndSubmit = async (formEl) => {
			if (!formEl) return;
			await formEl.validate(async (valid) => {
				if (valid) {
					const formData = {
						access_key: process.env.VUE_APP_WEB3FORMS_ACCESS_KEY,
						from_name: 'SimpleThingsYet - User Message',
						email: form.email,
						subject: form.subject,
						message: form.message,
					};
					await sendFormData(formData);
				} else {
					console.log('Form validation failed');
				}
			});
		};

		const handleSubmit = async (formEl) => {
			await validateAndSubmit(formEl);
		};

		const handleReset = (formEl) => {
			if (!formEl) return;
			formEl.resetFields();
		};

		return {
			form,
			formRef,
			rules,
			showAlert,
			formIsDisabled,
			handleSubmit,
			handleReset,
		};
	},
};
</script>
