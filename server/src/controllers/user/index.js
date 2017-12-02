const express = require('express')
const router = express.Router()
const { jwt, decode } = require('../../config/jwt')
const newUser = require('./new')
const loginUser = require('./login')
const deleteUser = require('./delete')
const updateUser = require('./update')
const listUsers = require('./list')
const {
  newUserRules,
  loginUserRules,
  deleteUserRules,
  updateUserRules
} = require('./rules')

const { User } = require('../../models/user')

router.get('/', jwt, listUsers)
router.post('/', newUserRules, newUser)
router.post('/login', loginUserRules, loginUser)
router.delete('/', deleteUserRules, jwt, deleteUser)
router.put('/', updateUserRules, jwt, updateUser)

/**
 * Asks for friendship
 */
router.post('/friendship/:friend_id', jwt, async (req, res) => {
  const { friend_id } = req.params
  const { id } = decode(req.get('Authorization'))

  const user = await User.findByIdAndUpdate(friend_id, {
    $push: { pending_invites: id }
  })

  res.send({
    message: `Frienship request was sent to ${user.email}`
  })
})

/**
 * Update friendship (give true to accept, false to refuse)
 */
router.put('/friendship/:friend_id', jwt, async (req, res) => {
  const { friend_id } = req.params
  const { status } = req.body
  const { id } = decode(req.get('Authorization'))

  if (status === 'ACCEPT') {
    await User.findByIdAndUpdate(id, {
      $pull: { pending_invites: friend_id },
      $push: { friends: friend_id }
    })
    const acceptedUser = await User.findByIdAndUpdate(friend_id, {
      $push: { friends: id }
    })

    return res.status(200).send({ user: acceptedUser })
  }

  const user = await User.findById(friend_id)
  await User.findByIdAndUpdate(id, {
    $pull: { pending_invites: friend_id }
  })

  return res.status(200).send({ user })
})

/**
 * Deletes a friendship
 */
router.delete('/friendship/:friend_id', jwt, async (req, res) => {
  const { friend_id } = req.params
  const { id } = decode(req.get('Authorization'))

  await User.findByIdAndUpdate(id, { $pull: { friends: friend_id } })
  const user = await User.findByIdAndUpdate(friend_id, {
    $pull: { friends: id }
  })

  res.status(200).send({ user })
})

/**
 * Get a single user
 */
router.get('/:id', jwt, async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
    .populate('friends', 'email')
    .populate('pending_invites', 'email')
    .select('first_name last_name phone email friends pending_invites')

  return res.status(200).send({ user })
})

module.exports = router
