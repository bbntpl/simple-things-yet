import api from './';

const baseUrl = '/categories';

/**
 * 
 * @param {*} queries 
 * @returns 
 */
export const fetchCategories = async (queries) => {
	const { skip, limit, sort } = queries;

	const queryString = new URLSearchParams({
		skip: skip || 0,
		limit: limit || 10,
		sort: sort || 'asc',
	}).toString();

	try {
		const response = await api.get(`${baseUrl}?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

export const fetchCategory = async (categoryId) => {
	try {
		const response = await api.get(`${baseUrl}/${categoryId}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};
