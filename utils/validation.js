// Middleware to validate req.body & req.query and handle validation errors

const { validationResult } = require("express-validator");
const userInputValidations = require("./validations/user-input");

const validateUserInput = [...userInputValidations, handleValidationErrors];

function handleValidationErrors(req, res, next) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    const err = new Error("Validation Error");
    err.title = "Bad Request";
    err.status = 400;

    validationErrors.array().forEach((error) => {
      if (!errors[error.path]) {
        errors[error.path] = error.msg;
      }
    });

    err.errors = errors;
    return next(err);
  }

  return next();
}

module.exports = {
  validateUserInput,
};
