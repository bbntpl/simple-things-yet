import axios from 'axios';

const api = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

export const requestOptions = (token, headersProps = {}) => {
	const headers = {
		...headersProps,
		// Currently Bookmarked: just in case that non-stringified key name won't work
		Authorization: `Bearer ${token}`,
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	const options = { headers };

	return options;
};

export const isTokenExpiredError = (error) => {
	const errorName = error?.response?.data?.error?.name?.toLowerCase() || '';
	const errorStatus = error?.response?.status;
	return errorName === 'tokenexpirederror' && errorStatus === 401;
};

export default api;
