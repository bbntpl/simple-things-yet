import axios from 'axios';

const baseUrl = '/blogs';

export const fetchPublishedBlogs = async () => {
	try {
		const publishedBlogs = await axios.get(`${baseUrl}/published`);
		return publishedBlogs.data;
	} catch (error) {
		console.log(error);
	}
};
