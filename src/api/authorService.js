import api from '.';

const baseUrl = '/author/';

/**
 * It fetches the author object
 * @returns {Promise<Object|void>} The fetched author or void if error occurs
 * @throws {Error} Throws and error if the fetch operation somehow fails.
 */
export const fetchAuthor = async () => {
	try {
		const response = await api.get(`${baseUrl}/info`);
		return response.data;
	} catch (error) {
		throw new Error(
			'Something went wrong when fetching the author information',
		);
	}
};

/**
 * It returns the author image url
 * @param {String} imageId The imageId of the author image
 * @returns {String} The image url
 */
export const getAuthorImageUrl = (imageId) => {
	return `${process.env.VUE_APP_API_URL}/api/author/${imageId}/image`;
};
