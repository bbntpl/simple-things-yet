import { ElLoading, ElMessage } from 'element-plus';

/**
 * Execute async functions to initialize necessary data during vue components mount.
 * @param {Object} store The store instance.
 * @param {Function} apiRequest Async function(s) that'll be executed.
 * @param {Object} options Other args such as errors.
 */
export const execInit = async (asyncFn, options = {}) => {
	const {
		loadingText = 'Loading...',
		fullscreen = true,
		errorMsg = 'Error occurred.',
	} = options;

	const loadingInstance = ElLoading.service({
		text: loadingText,
		fullscreen: fullscreen,
	});

	try {
		await asyncFn();
	} catch (error) {
		ElMessage.error(errorMsg);
	} finally {
		loadingInstance.close();
	}
};

/**
 * Extract text from the stringified html.
 * @param {string} blogContent Stringified set of HTML tags.
 * @param {number} numOfChars Number of characters for first set of chars extraction.
 * @returns Extracted plain text.
 */
export const extractTextFromStringifiedHTML = (htmlString, numOfChars = 50) => {
	// Create a temp element to convert HTML to plain text
	const tempElement = document.createElement('div');
	tempElement.innerHTML = htmlString;

	// Get the text without HTML tags
	const plainText = tempElement.textContent || tempElement.innerText;

	// Extract the first nth characters
	return plainText.slice(0, numOfChars);
};
