import api, { requestOptions } from '.';

const baseUrl = '/comments';

/**
 * Fetches a comment object
 * @async
 * @param {string} parentCommentId - Parent comment ID of the comment.
 * @returns {Promise<Comment|Error>} Returns an existing comment or error if request fails.
 */
export const fetchComment = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Fetches replies to a comment
 * @async
 * @param {string} parentCommentId - Parent comment ID of the reply
 * @returns {Promise<Comment[]|Error>} Returns an existing comment or error if request fails
 */
export const fetchReplies = async (parentCommentId) => {
	try {
		const response = await api.get(`${baseUrl}/${parentCommentId}/replies`);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Creates a new comment
 * @async
 * @param {NewComment} newComment - New comment object.
 * @param {string} token - Authentication token.
 * @returns {Promise<Comment|Error>} Returns new comment data or error response data.
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
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Updates an existing comment
 * @async
 * @param {Object} data - Object that contains parentCommentId and updatedComment
 * @param {string} data.parentCommentId - ID of the comment to be updated.
 * @param {CommentToUpdate} data.updatedComment - Object containing the updated data for the comment.
 * @param {string} token - Authentication token.
 * @returns {Promise<Comment|Error>} Returns the updated comment data or error response data.
 */
export const updateComment = async (data, token) => {
	const { parentCommentId, updatedComment } = data;
	try {
		const response = await api.put(
			`${baseUrl}/${parentCommentId}/`,
			updatedComment,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Deletes a comment
 * @async
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
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Creates a new reply for a comment
 * @async
 * @param {Object} data - Object that contains parentCommentId and newReply
 * @param {string} data.parentCommentId - ID of the parent comment.
 * @param {NewComment} data.newReply - New reply object.
 * @param {string} token - Authentication token.
 * @returns {Promise<Comment|Error>} Returns the new reply data or error response data.
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
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Updates a reply for a comment
 * @async
 * @param {Object} data - Object that contains parentCommentId, replyId and updatedReply
 * @param {string} data.parentCommentId - ID of the parent comment.
 * @param {string} data.replyId - ID of the reply to be updated.
 * @param {CommentToUpdate} data.updatedReply - Object containing the updated data for the reply.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the updated reply data or error response data.
 */
export const updateReply = async (data, token) => {
	const { parentCommentId, replyId, updatedReply } = data;
	try {
		const response = await api.put(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			updatedReply,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};

/**
 * Deletes a reply for a comment
 * @async
 * @param {Object} data - Object that contains parentCommentId and replyId
 * @param {string} data.parentCommentId - Parent comment ID
 * @param {string} data.replyId - Reply ID
 * @param {string} token - Authentication token.
 * @returns {Promise<Object|Error>} Returns the delete response data or error response data.
 */
export const deleteReply = async (data, token) => {
	const { parentCommentId, replyId } = data;
	try {
		const response = await api.delete(
			`${baseUrl}/${parentCommentId}/replies/${replyId}`,
			requestOptions(token),
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// Return error data for UI display
			return error.response.data;
		}
	}
};
