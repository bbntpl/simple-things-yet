import api from './';

const baseUrl = '/images';

/**
 * Fetches image doc which contains partial metadata info and credit if it exists
 * @async
 * @param {string} imageId - image ID
 * @returns {Promise<Object>} Promised object of image doc
 * @throws {Error} Throws an error if the fetch operation fails
 */
export const fetchImageDoc = async (imageId) => {
	try {
		const response = await api.get(`${baseUrl}/${imageId}/doc`);
		return response.data;
	} catch (error) {
		throw new Error('An error occurred during image document fetch');
	}
};
