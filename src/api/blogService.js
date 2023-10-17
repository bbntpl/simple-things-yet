import { convertToQueryUrl } from '@/utils/helpers';
import api, { requestOptions } from './';

const baseUrl = '/blogs';

/**
 * Fetches published blogs.
 * @returns {Promise<Object[]>} Array promises of published blog objects.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export const fetchPublishedBlogs = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(`${baseUrl}/published?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};
/**
 * Fetches total amount of published blogs with unset category.
 * @returns {Promise<Object>} Object that contains the amount of blogs.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export const fetchTotalPublishedBlogsWithUnsetCategory = async () => {
	try {
		const response = await api.get(`${baseUrl}/published/unset-category`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * Updates a blog with user interaction.
 * @param {Object} updatedBlog - The blog data that'll be updated.
 * @param {Object} user - The user object
 * @param {string} user.id - The user's ID.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object|Error>} The updated blog object or error if an error occurs.
 */
export const updateBlogWithUserInteraction = async (
	updatedBlog,
	user,
	token,
) => {
	try {
		const response = await api.put(
			`${baseUrl}/${user.id}`,
			updatedBlog,
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
 * It returns the blog image url
 * @param {String} imageId The imageId of the blog image
 * @returns {String} The image url
 */
export const getBlogImageUrl = (imageId) => {
	return `${process.env.VUE_APP_API_URL}/api/blogs/${imageId}/image`;
};
