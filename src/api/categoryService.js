import { convertToQueryUrl } from '@/utils/helpers';
import api from './';

const baseUrl = '/categories';

/**
 * Fetches array of categories
 * @async
 * @param {DataFetchQueries} queries - Queries which arranges the categories-to-fetch
 * @returns  {Promise<CategoryWithPublishedBlogs[]>} Promised categories with published blogs
 * @throws {Error} Throws an error if the fetch operation falis
 */
export const fetchCategoriesWithPublishedBlogs = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(
			`${baseUrl}/with-published-blogs?${queryString}`,
		);
		return response.data;
	} catch (error) {
		throw new Error(
			'Something went wrong when fetching categories with published blogs',
		);
	}
};

/**
 * Fetches array of categories with published blogs
 * @param {DataFetchQueries} queries - Queries which arranges the categories-to-fetch
 * @returns  {Promise<CategoryWithLatestBlogs[]>} Promised categories with latest blogs
 * @throws {Error} Throws an error if the fetch operation falis
 */
export const fetchCategoriesWithLatestBlogs = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(
			`${baseUrl}/with-latest-blogs?${queryString}`,
		);
		return response.data;
	} catch (error) {
		throw new Error(
			'Something went wrong when fetching the categories with latest blogs',
		);
	}
};

/**
 * Fetches a specific category
 * @param {string} categoryId Category ID
 * @returns {Promise<Category>} Promised category object
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchCategory = async (categoryId) => {
	try {
		const response = await api.get(`${baseUrl}/${categoryId}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching a category');
	}
};

/**
 * It returns the category image url
 * @param {String} imageId The image ID of the category
 * @returns {String} The image url
 */
export const getCategoryImageUrl = (imageId) => {
	return `${process.env.VUE_APP_API_URL}/api/category/${imageId}/image`;
};
