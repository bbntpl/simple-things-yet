import api, { requestOptions } from './api';

const baseUrl = '/viewers';

/**
 * Fetches the user's data by its ID.
 *
 * @param {Object} user - User information.
 * @param {string} user.id - The ID of the user.
 * @returns {Promise<Object>} Returns the viewer's data.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchViewerRequest = async (user) => {
	try {
		const response = await api.get(`${baseUrl}/${user.id}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * Registers a new user account.
 *
 * @param {Object} user - User registration data.
 * @returns {Promise<Object>} Returns the response data.
 */
export const registerUserAccountRequest = async (user) => {
	try {
		const response = await api.post(`${baseUrl}/register`, user);
		return response.data;
	} catch (error) {
		if (error) {
			return error.data.response;
		}
	}
};

/**
 * Logins a user.
 *
 * @param {Object} userCredentials - User login credentials.
 * @returns {Promise<Object|Error>} Returns the login response data or error if error occurs.
 */
export const loginUserRequest = async (userCredentials) => {
	try {
		const response = await api.post(`${baseUrl}/login`, userCredentials);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Deletes a user account.
 *
 * @param {Object} user - User data needed for deletion.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the response data or error if error occur.
 */
export const deleteUserAccountRequest = async (user, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${user.id}/delete`,
			{ password: user.password },
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Updates user's information.
 *
 * @param {Object} user - User data for the update.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object>} Returns the response data.
 * @throws {Error} Throws an error if the request fails.
 */
export const updateUserInfoRequest = async (user, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}/change-password`,
			user,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error?.response) {
			return error.response.data;
		} else {
			throw new Error(error);
		}
	}
};

/**
 * Changes the password of a user.
 *
 * @param {Object} user - User data for the password change.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the response data or error if error occurs.
 */
export const changeUserPwdRequest = async (user, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}/update`,
			user,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};
