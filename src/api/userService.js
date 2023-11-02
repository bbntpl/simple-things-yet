import api, { requestOptions } from './api';
const baseUrl = '/viewers';

/**
 * Fetches the user's data by its ID.
 * @async
 * @param {string} userId - The ID of the user.
 * @returns {Promise<User>} Returns the user's data.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchUserRequest = async (userId) => {
	try {
		const response = await api.get(`${baseUrl}/${userId}`);
		return response.data;
	} catch (error) {
		throw new Error('User infomation has failed to load');
	}
};

/**
 * Registers a new user account.
 * @async
 * @param {UserRegistrationData} user - User registration data.
 * @returns {Promise<User|Error>} Returns the response data.
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
 * @async
 * @param {UserCredentials} userCredentials - User login credentials.
 * @returns {Promise<LoginResponseData|Error>} Returns the login response data or error if error occurs.
 */
export const loginUserRequest = async (userCredentials) => {
	try {
		const response = await api.post(`${baseUrl}/login`, userCredentials);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Deletes a user account.
 * @async
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
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Updates user's information.
 * @async
 * @param {Object} user - User data for the update.
 * @param {Object} user.username - Username.
 * @param {Object} user.name - Name of the user.
 * @param {string} token - Authentication token.
 * @returns {Promise<User|Error>} Returns the response data.
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
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		} else {
			throw new Error('Updating your info has failed.');
		}
	}
};

/**
 * Changes the password of a user.
 * @async
 * @param {PasswordChangeInputs} user - User data for the password change.
 * @param {string} token - Authentication token.
 * @returns {Promise<MessageResponse|ErrorMessageResponse|Error>} Returns the response data or error if error occurs.
 * @throws {Error} Throws an error if the request fails.
 */
export const changeUserPwdRequest = async (user, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}/change-password`,
			user,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}

		throw new Error('Changing your password has failed');
	}
};
