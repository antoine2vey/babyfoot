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

router.get('/', listUsers)
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
  const { accepts } = req.body
  const { id } = decode(req.get('Authorization'))

  if (accepts == true) {
    await User.findByIdAndUpdate(id, {
      $pull: { pending_invites: friend_id },
      $push: { friends: friend_id }
    })
    const acceptedUser = await User.findByIdAndUpdate(friend_id, {
      $push: { friends: id }
    })

    return res.status(200).send({
      message: `You accepted ${acceptedUser.email} in friend`
    })
  }

  await User.findByIdAndUpdate(id, {
    $pull: { pending_invites: friend_id }
  })

  return res.status(200).send({
    message: 'You refused friendship!'
  })
})

/**
 * Deletes a friendship
 */
router.delete('/friendship/:friend_id', jwt, async (req, res) => {
  const { friend_id } = req.params
  const { id } = decode(req.get('Authorization'))

  await User.findByIdAndUpdate(id, { $pull: { friends: friend_id } })
  await User.findByIdAndUpdate(friend_id, { $pull: { friends: id } })

  res.status(200).send({
    message: 'Deleted friendship :\'('
  })
})

/**
 * Get a single user
 */
router.get('/:id', jwt, async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).select(
    'first_name last_name phone email'
  )

  return res.status(200).send({ user })
})

module.exports = router
