import { sendErrorResponse } from "../utils/responses"

export function requireAuth(req, res, next) {
	if (req.isAuthenticated()) return next();
	return sendErrorResponse(res, { status: 401, error: "Unauthorized" });
}
