import { convertToQueryUrl } from '@/utils/helpers';
import api, { requestOptions } from './';

const baseUrl = '/blogs';

/**
 * Fetches published blogs
 * @async
 * @param {DataFetchQueries} queries - The queries which arranges the exact data-to-fetch
 * @returns {Promise<PublishedBlog[]>} Promised array of published blogs
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchPublishedBlogs = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(`${baseUrl}/published?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching the published blogs');
	}
};

/**
 * Fetches published blog by slug.
 * @async
 * @param {string} slug - The slug format of blog's title
 * @returns {Promise<PublishedBlog>} Promise of a published blog
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchPublishedBlogBySlug = async (slug) => {
	const queryString = convertToQueryUrl({ slug });
	try {
		const response = await api.get(`${baseUrl}/published/doc?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching the published blogs');
	}
};

/**
 * Fetches published blog by ID.
 * @async
 * @param {string} blogId - Published blog ID
 * @returns {Promise<PublishedBlog>} Promise of a published blog
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchPublishedBlogById = async (blogId) => {
	const queryString = convertToQueryUrl({ id: blogId });
	try {
		const response = await api.get(`${baseUrl}/published/doc?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching a blog');
	}
};

/**
 * Fetches total amount of published blogs with unset category
 * @async
 * @returns {Promise<number>} Amount of published blogs without category
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchTotalPublishedBlogsWithUnsetCategory = async () => {
	try {
		const response = await api.get(`${baseUrl}/published/unset-category`);
		return response.data.size;
	} catch (error) {
		throw new Error(
			'Something went wrong when fetching total blogs without categories',
		);
	}
};

/**
 * Fetches total amount of published blogs.
 * @async
 * @returns {Promise<number>} Total number of published blogs
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchTotalPublishedBlogs = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(
			`${baseUrl}/published/total-blogs?${queryString}`,
		);
		return response.data.size;
	} catch (error) {
		throw new Error('Something went wrong when fetching total published blogs');
	}
};

/**
 * Updates a blog with user interaction
 * @async
 * @param {Object} data - Object that contains blogId and userId
 * @param {Object} data.blogId - Blog ID
 * @param {string} data.userId - User ID
 * @param {string} token - Authentication token
 * @returns {Promise<PublishedBlog|Error>} The updated blog object or error if an error occurs.
 */
export const likeBlogPost = async (data, token) => {
	const { blogId, userId } = data;
	try {
		const response = await api.put(
			`${baseUrl}/${blogId}/likes/${userId}`,
			{},
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
