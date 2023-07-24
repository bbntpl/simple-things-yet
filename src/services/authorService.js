import api from './api';

export const fetchAuthor = async () => {
	try {
		const response = await api.get('/author/');
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};
