import { check } from "express-validator";
import { handleValidationErrors } from "../validation.js";

// run the check and validation for required fields
export const validateUser = [
	check("firstName").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid first name"),
	check("lastName").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid last name"),
	check("nickname").optional(),
	check("username").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid username"),
	check("email").exists({ checkFalsy: true }).isEmail().withMessage("Please provide a valid email"),
	check("birthdate").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid birthday"),
	check("profession").optional(),
	check("skillLevel").optional().isString().withMessage("Please provide a valid skill level"),
	check("avatar").optional(),
	check("bio").optional().isString().isLength({ min: 10, max: 1000 }),
	check("githubUrl").optional(),
	check("pastProjects").optional().isArray(),

	handleValidationErrors,
];

export const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.withMessage("Username or Email is required")
		.isString()
		.withMessage("Please provide valid email"),
	check("password").exists({ checkFalsy: true }).withMessage("Password is required"),
	handleValidationErrors,
];
