import api, { requestOptions } from '.';

const baseUrl = '/comments';

/**
 * Fetches existing comments
 *
 * @returns {Promise<Object[]>} Returns array of existing comments.
 * @throws {Error} Throws and error if the request fails.
 */
export const fetchComments = async () => {
	try {
		const response = await api.get(`${baseUrl}/`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching the comments');
	}
};

/**
 * Fetches a comment object
 *
 * @param {string} parentCommentId - Parent comment ID of the comment.
 * @returns {Promise<Object|Error>} Returns an existing comment or error if request fails.
 */
export const fetchComment = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Fetches existing replies
 *
 * @param {string} parentCommentId - Parent comment ID of the reply.
 * @returns {Promise<Object[]>} Returns an existing reply.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchReplies = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		throw new Error('Something went wrong when fetching the replies');
	}
};

/**
 * Creates a new comment
 *
 * @param {Object} newComment - New comment object.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns new comment data or error response data.
 */
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
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Updates an existing comment
 *
 * @param {string} parentCommentId - ID of the comment to be updated.
 * @param {Object} updatedComment - Object containing the updated data for the comment.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the updated comment data or error response data.
 */
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
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Deletes a comment
 *
 * @param {string} parentCommentId - ID of the comment to be deleted.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the delete response data or error response data.
 */
export const deleteComment = async (parentCommentId, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${parentCommentId}/`,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Creates a new reply for a comment
 *
 * @param {string} parentCommentId - ID of the parent comment.
 * @param {Object} newReply - New reply object.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the new reply data or error response data.
 */
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
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Updates a reply for a comment
 *
 * @param {string} parentCommentId - ID of the parent comment.
 * @param {string} replyId - ID of the reply to be updated.
 * @param {Object} updatedReply - Object containing the updated data for the reply.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the updated reply data or error response data.
 */
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
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};

/**
 * Deletes a reply for a comment
 *
 * @param {string} parentCommentId - ID of the parent comment.
 * @param {string} replyId - ID of the reply to be deleted.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the delete response data or error response data.
 */
export const deleteReply = async (parentCommentId, replyId, token) => {
	try {
		const response = await api.delete(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display, leveraging axios interceptors.
			return error.response.data;
		}
	}
};
