import { convertToQueryUrl } from '@/utils/helpers';
import api from './';

const baseUrl = '/tags';

/**
 * Fetches array of tags
 * @param {DataFetchQueries} queries - The queries which arranges the exact data-to-fetch
 * @returns {Promise<Tag[]>} Array of tag objects if resolved
 * @throws {Error} Otherwise, throws an error
 */
export const fetchTags = async (queries) => {
	const queryString = convertToQueryUrl(queries);
	try {
		const response = await api.get(`${baseUrl}?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching tags');
	}
};

/**
 * Fetches a tag by ID
 * @param {string} tagId - Tag ID
 * @returns {Promise<Tag>} Promised tag object
 * @throws {Error} Otherwise, throws an error
 */
export const fetchTagById = async (tagId) => {
	try {
		const response = await api.get(`${baseUrl}/${tagId}`);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong when fetching a tag');
	}
};
