import api from './';

const baseUrl = '/categories';

/**
 * Fetches array of categories
 * @param {Object} queries - The queries that contributes to arrange the set of categories will be fetched
 * @returns  {Promise<Object|Error>} The collection of categories (promised)
 * @throws {Error} Throws an error if the fetch operation falis
 */
export const fetchCategories = async (queries) => {
	const queryString = new URLSearchParams({
		skip: queries.skip || 0,
		limit: queries.limit || 100,
		sort: queries.sort || 'asc',
	}).toString();

	try {
		const response = await api.get(
			`${baseUrl}/with-published-blogs?${queryString}`,
		);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * Fetches a particular category
 * @param {String} categoryId category ID
 * @returns {Promise<Object|Error>} Promised category object
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchCategory = async (categoryId) => {
	try {
		const response = await api.get(`${baseUrl}/${categoryId}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * It returns the cateogry image url
 * @param {String} imageId The imageId of the cateogry image
 * @returns {String} The image url
 */
export const getCategoryImageUrl = (imageId) => {
	return `${process.env.VUE_APP_API_URL}/api/category/${imageId}/image`;
};
