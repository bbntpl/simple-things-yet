import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.VUE_APP_API_URL}/api`,
});

/**
 * Generates axios request options with headers
 *
 * @param {string} token - Authentication token.
 * @param {Object} [headersProps={}] - Headers properties
 * @returns {Object} Returns request options to be added to axios requests
 */

export const requestOptions = (token, headersProps = {}) => {
	const headers = {
		...headersProps,
		Authorization: `Bearer ${token}`,
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	const options = { headers };

	return options;
};
/**
 * Determines if the error corresponds to a token expiration error.
 *
 * @param {Object} error - The error object.
 * @returns {boolean} Return true if it's a token expiration error, otherwise false.
 */

export const isTokenExpiredError = (error) => {
	const errorName = error?.response?.data?.error?.name?.toLowerCase() || '';
	const errorStatus = error?.response?.status;
	return errorName === 'tokenexpirederror' && errorStatus === 401;
};

export default api;
