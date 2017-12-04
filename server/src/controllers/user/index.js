const express = require('express')
const router = express.Router()
const { jwt } = require('../../config/jwt')
const newUser = require('./new')
const loginUser = require('./login')
const deleteUser = require('./delete')
const updateUser = require('./update')
const listUsers = require('./list')
const friend = require('./friend')
const updateFriendship = require('./updateFriendship')
const single = require('./single')

const deleteFriendship = require('./unfriend')
const {
  newUserRules,
  loginUserRules,
  deleteUserRules,
  updateUserRules
} = require('./rules')

/**
 * All user possible routes
 */
router.get('/', jwt, listUsers)
router.get('/:id', jwt, single)

router.post('/', newUserRules, newUser)
router.post('/login', loginUserRules, loginUser)
router.post('/friendship/:friend_id', jwt, friend)

router.put('/', updateUserRules, jwt, updateUser)
router.put('/friendship/:friend_id', jwt, updateFriendship)

router.delete('/friendship/:friend_id', jwt, deleteFriendship)
router.delete('/', deleteUserRules, jwt, deleteUser)

module.exports = router
