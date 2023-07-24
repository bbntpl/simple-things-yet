import api, { requestOptions } from './api';

const baseUrl = '/viewers';

export const fetchViewerRequest = async (user) => {
	try {
		const response = await api.get(`${baseUrl}/${user.id}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

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

export const loginUserRequest = async (userCredentials) => {
	try {
		const response = await api.post(`${baseUrl}/login`, userCredentials);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

// user param should contain password and id
export const deleteUserAccountRequest = async (user, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${user.id}/delete`,
			{ password: user.password },
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const updateUserInfoRequest = async (user, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}/change-password`,
			user,
			requestOptions(token)
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

export const changeUserPwdRequest = async (user, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}/update`,
			user,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};
