/**
 * @typedef {Object} UserCredentials
 * @property {string} username - Username
 * @property {string} password - User password
 */

/**
 * @typedef {Object} UserRegistrationData
 * @property {string} name - Name of the user
 * @property {string} username - Username
 * @property {string} password - User password
 */

/**
 * @typedef {Object} LoginResponseData
 * @property {string} name - Name of the user
 * @property {string} token - Authentication token
 * @property {string} username - Username
 */

/**
 * @typedef {Object} PasswordChangeInputs
 * @property {string} id - User ID
 * @property {string} currentPassword - User's current password
 * @property {string} newPassword - User's new password
 * @property {string} confirmNewPassword - User's new password again for confirmation
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - Name of the user
 * @property {string} username - Username
 * @property {string[]} comments - IDs of user comments
 * @property {Date} createdAt - Creation date
 * @property {Date} updateAt - Update date
 */
