const { body, query } = require("express-validator");

const userInputValidations = [
  checkForExtraFields,
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required")
    .isAlpha()
    .withMessage("Invalid characters for First Name")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),
  body("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters")
    .isAlpha()
    .withMessage("Invalid characters for First Name"),
  body("nickname")
    .optional()
    .isAlpha()
    .withMessage("Invalid characters for nickname")
    .isLength({ min: 1, max: 20 })
    .withMessage("Nickname must be between 1 and 20 characters"),
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be between 6 and 20 characters"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("birthdate")
    .exists({ checkFalsy: true })
    .withMessage("Birthday is required")
    .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
    .withMessage("Date must be in the format MM-DD-YYYY")
    .toDate(),
  body("profession")
    .optional()
    .isObject()
    .withMessage(
      "Profession should be ref object in format {title: Profession Title, skillLevel: Skill Level}"
    ),
  body("avatar")
    .optional()
    .custom((value) => {
      // Check if it's a URL or matches the image file format
      const isUrl = /^https?:\/\/.+\.(jpeg|jpg|png|gif)$/i.test(value);
      // Check if it's a valid filename with image extensions
      const isFileFormat = /\.(jpeg|jpg|png|gif)$/i.test(value);
      if (!isUrl && !isFileFormat) {
        throw new Error(
          "Please provide a valid Avatar image URL or a valid image file format (.jpeg, .jpg, .png, .gif)"
        );
      }
      return true; // If valid, return true
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("Invalid characters for string")
    .isLength({ min: 3, max: 250 })
    .withMessage(
      "User provided description must be between 3 and 250 characters"
    ),
  body("pastProjectLinks")
    .optional()
    .isArray()
    .withMessage("Past Projects should be an array of strings"),
];

// TODO: add to list of allowed fields
function checkForExtraFields(req, res, next) {
  const allowedFields = [
    "firstName",
    "lastName",
    "nickname",
    "username",
    "email",
    "birthdate",
    "profession",
    "avatar",
    "description",
    "pastProjectLinks",
  ];

  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  // If there are extra fields, respond with an error
  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Extra fields detected: ${extraFields.join(", ")}` });
  }

  // If no extra fields, proceed to the next middleware
  next();
}

module.exports = userInputValidations;
