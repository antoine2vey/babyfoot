const express = require('express');
const router = express.Router();
const { jwt } = require('../../config/jwt');
const newUser = require('./new');
const loginUser = require('./login');
const deleteUser = require('./delete');
const updateUser = require('./update');
const listUsers = require('./list');
const {
  newUserRules,
  loginUserRules,
  deleteUserRules,
  updateUserRules
} = require('./rules');

/**
 * List all users
 * @param  {} '/'
 * @param  {} listUsers
 */
router.get('/', listUsers);

/**
 * Create a new user
 * @param  {} '/new'
 * @param  {} newUserRules
 * @param  {} asyncFn
 */
router.post('/', newUserRules, newUser);

/**
 * Handle login for app
 * @param  {} '/login'
 * @param  {} asyncFn
 */
router.post('/login', loginUserRules, loginUser);

/**
 * Handle user delete
 * @param  {} '/'
 * @param  {} deleteUserRules
 * @param  {} jwt
 * @param  {} deleteUser
 */
router.delete('/', deleteUserRules, jwt, deleteUser);

/**
 * Handle user update for password at this time
 * @param  {} '/'
 * @param  {} updateUserRules
 * @param  {} jwt
 * @param  {} updateUser
 */
router.put('/', updateUserRules, jwt, updateUser);

module.exports = router;
