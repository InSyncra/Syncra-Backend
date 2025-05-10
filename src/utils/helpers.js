/**
 * Creates a standardized API response object.
 *
 * @param {Object} options - Response details.
 * @param {Array|object|null} [options.data=null] - The response payload (any type).
 * @param {string|null} [options.error=null] - Error message, if any.
 * @returns {{ data: *, error: (string|null), success: boolean }} The formatted response.
 */
export function sendResponse({ data = null, error = null }) {
	const hasError = typeof error === "string" && error.trim() !== "";
	const hasData = data !== null;

	if (!hasData && !hasError) throw new Error("Must provide either data or error.");

	if (hasData && hasError) throw new Error("Cannot provide both data and error.");

	return {
		data: hasData ? data : null,
		error: hasError ? error : null,
		success: hasData && !hasError,
	};
}
