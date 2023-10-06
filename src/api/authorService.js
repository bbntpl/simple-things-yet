import api from '.';

const baseUrl = '/author/';

/**
 * It fetches the author object
 * @returns {Promise<Object|void>} The fetched author or void if error occurs
 * @throws {Error} Throws and error if the fetch operation somehow fails.
 */
export const fetchAuthor = async () => {
	try {
		const response = await api.get(baseUrl);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};
