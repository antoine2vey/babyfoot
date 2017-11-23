const { body } = require('express-validator/check')

const newUserRules = [
  body('username', 'Tu dois fournir un nom d\'utilisateur')
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
  body('username', 'Username must not be empty')
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
    .isLength({ min: 24, max: 24 })
    .isHexadecimal()
]

const updateUserRules = [
  body('userId', 'User is not valid')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 24, max: 24 })
    .isHexadecimal(),
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
