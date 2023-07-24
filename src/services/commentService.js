import api, { requestOptions } from './api';

const baseUrl = '/comments';

export const fetchComments = async () => {
	try {
		const response = await api.get(`${baseUrl}/`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

export const fetchComment = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const fetchReplies = (parentCommentId) => {
	try {
		const response = api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

export const createComment = (newComment, token) => {
	try {
		const response = api.post(`${baseUrl}/`, newComment, requestOptions(token));
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const updateComment = (parentCommentId, updatedComment, token) => {
	try {
		const response = api.put(
			`${baseUrl}/${parentCommentId}/`,
			updatedComment,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const deleteComment = (parentCommentId, token) => {
	try {
		const response = api.delete(
			`${baseUrl}/${parentCommentId}/`,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const createReply = (parentCommentId, newReply, token) => {
	try {
		const response = api.post(
			`${baseUrl}/${parentCommentId}/replies`,
			newReply,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const updateReply = (parentCommentId, replyId, updatedReply, token) => {
	try {
		const response = api.put(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			updatedReply,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const deleteReply = (parentCommentId, replyId, token) => {
	try {
		const response = api.delete(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			requestOptions(token)
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};
