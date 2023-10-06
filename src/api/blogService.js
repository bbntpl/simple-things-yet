import api, { requestOptions } from './';

const baseUrl = '/blogs';

/**
 * Fetches published blogs.
 * @returns {Promise<Object[]>} Array promises of published blog objects.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export const fetchPublishedBlogs = async () => {
	// const { skip, limit, sort } = queries;
	try {
		const response = await api.get(`${baseUrl}/published`);
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
