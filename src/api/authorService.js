import api from '.';

const baseUrl = '/author/';

/**
 * It fetches the author object
 * @async
 * @returns {Promise<AuthorInfo|void>} Author info or void if error occurred
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
