import { ElLoading, ElMessage } from 'element-plus';

/**
 * Execute async functions to initialize necessary data during vue components mount.
 * @param {Object} store The store instance.
 * @param {Function} apiRequest Async function(s) that'll be executed.
 * @param {Object} options Other args such as errors.
 */
export const execInit = async (asyncFn, options = {}) => {
	const { loadingText = 'Loading...', fullscreen = true } = options;

	const loadingInstance = ElLoading.service({
		text: loadingText,
		fullscreen: fullscreen,
	});

	try {
		await asyncFn();
	} catch (error) {
		ElMessage.error(options.errorMsg || error.message);
	} finally {
		loadingInstance.close();
	}
};

/**
 * Convert an object to a query string URL.
 * @param {Object} obj - The object to be converted to a query string.
 * @returns {string} The query string URL.
 */
export const convertToQueryUrl = (queries) => {
	console.log(queries);
	const params = new URLSearchParams({
		...(!queries.skip ? {} : { skip: queries.skip }),
		...(!queries.limit ? {} : { limit: queries.limit }),
		sort: queries.sort || 'asc',
		excludeIds: queries.excludeIds || [],
	});

	for (const [key, value] of Object.entries(params)) {
		if (Array.isArray(value)) {
			params.delete(key);
			value.forEach((v) => params.append(key, v));
		}
	}
	console.log(params.toString());
	return params.toString();
};

/**
 * Extract IDs of the objects.
 * @param {Array<Object>} docs Array of objects with IDs.
 * @returns {Array<string>} Array of IDs.
 */
export const extractIds = (docs) => {
	console.log(docs);
	if (docs.length === 0) return [];
	return docs.map((doc) => doc.id);
};

/**
 * Extract text from the stringified html.
 * @param {string} blogContent Stringified set of HTML tags.
 * @param {number} numOfChars Number of characters for first set of chars extraction.
 * @returns {string} Extracted plain text.
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
