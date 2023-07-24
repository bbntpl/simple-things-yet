import api, { requestOptions } from './api';

const baseUrl = '/blogs';

export const fetchPublishedBlogs = async () => {
	try {
		const response = await api.get(`${baseUrl}/published`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateBlogWithUserInteraction = async (
	updatedBlog,
	user,
	token
) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}`,
			updatedBlog,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};
