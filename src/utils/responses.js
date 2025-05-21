import logger from "./logger.js";

/**
 * Sends a standardized successful Express response with options to pass in data and add optional status
 * @param {import("express").Response} res - Express response object.
 * @param {{data: any, status?: number, message?: string | null}} options - Response details.
 * @param {any} options.data - Payload to send in the response.
 * @param {number} [options.status=200] - HTTP status code to use. Defaults to 200
 * @param {string | null} [options.message = null] - Optional message to log to server's app.log file (for auditing)
 * @returns {import("express").Response} - The express response object
 */
export function sendSuccessResponse(res, { data, status = 200, message = null }) {
	if (message) {
		logger.info(message);
	}
	return res.status(status).json({
		success: true,
		data,
		error: null,
	});
}

/**
 * Sends a standardized error response.
 * @param {import("express").Response} res - Express response object.
 * @param {{status?: number, error: any }} options - Error and status details. Status defaults to 500 Internal Server Error if not provided
 * @returns {import("express").Response} - The express response object
 */
export function sendErrorResponse(res, { status = 500, error }) {
	logger.error(error.message || error);
	return res.status(status).json({ success: false, data: null, error });
}
