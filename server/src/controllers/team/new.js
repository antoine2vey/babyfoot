const { validationResult } = require('express-validator/check')

const { s3, getParamForFile } = require('../../config/aws')
const { Team } = require('../../models/team')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { name } = req.body
  const { id } = req.user

  const teamExists = await Team.findOne({ name })

  if (teamExists) {
    return res.status(404).send({
      message: 'Équipe déjà existante!'
    })
  }

  const params = getParamForFile('stella-avatar-team', req.file)
  s3.upload(params, (err, { Location }) => {
    if (err) {
      return res.status(400).send({
        message: 'Error importing image to AWS'
      })
    }

    const team = new Team({
      name,
      logo: Location,
      members: [id]
    })

    team.save(err => {
      if (err) {
        return res.status(400).send({
          message: 'Mauvais format d\'équipe'
        })
      }

      res.status(200).send({
        message: `Team ${team.name} created.`
      })
    })
  })
}
