import api, { requestOptions } from '.';

const baseUrl = '/comments';

export const fetchComments = async () => {
	try {
		const response = await api.get(`${baseUrl}/non-existent`);
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

export const fetchReplies = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};

export const createComment = async (newComment, token) => {
	try {
		const response = await api.post(
			`${baseUrl}/`,
			newComment,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const updateComment = async (parentCommentId, updatedComment, token) => {
	try {
		const response = await api.put(
			`${baseUrl}/${parentCommentId}/`,
			updatedComment,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const deleteComment = async (parentCommentId, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${parentCommentId}/`,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const createReply = async (parentCommentId, newReply, token) => {
	try {
		const response = await api.post(
			`${baseUrl}/${parentCommentId}/replies`,
			newReply,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const updateReply = async (
	parentCommentId,
	replyId,
	updatedReply,
	token,
) => {
	try {
		const response = await api.put(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			updatedReply,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};

export const deleteReply = async (parentCommentId, replyId, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			return error.response.data;
		}
	}
};
