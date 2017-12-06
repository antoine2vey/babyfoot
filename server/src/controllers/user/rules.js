const { body } = require('express-validator/check')

const newUserRules = [
  body('email', 'Tu dois fournir un email')
    .isEmail()
    .exists()
    .not()
    .isEmpty(),
  body('password')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Tu dois fournir un mot de passe')
    .isLength({ min: 5 })
    .withMessage('Minimum 5 caractères')
]

const loginUserRules = [
  body('email', 'Username must not be empty')
    .exists()
    .not()
    .isEmpty(),
  body('password', 'Password must not be empty')
    .exists()
    .not()
    .isEmpty()
]

const deleteUserRules = [
  body('userId', 'User is not valid')
    .exists()
    .not()
    .isEmpty()
    .isMongoId()
]

const updateUserRules = [
  body('userId', 'User is not valid')
    .exists()
    .not()
    .isEmpty()
    .isMongoId(),
  body('confirmPassword', 'Current password must not be empty')
    .exists()
    .not()
    .isEmpty(),
  body('newPassword', 'New password must be 5 length min')
    .exists()
    .isLength({ min: 5 })
]

module.exports = {
  newUserRules,
  loginUserRules,
  deleteUserRules,
  updateUserRules
}
