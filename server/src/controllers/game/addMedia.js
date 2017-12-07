const { validationResult } = require('express-validator/check')
const { s3, getParamForFile } = require('../../config/aws')
const { Game } = require('../../models/game')

/**
 * Ajoute une photo a une partie précise
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const errors = validationResult(req)
  const { gameId } = req.params

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const gameIsValid = await Game.findById(gameId)

  if (!gameIsValid) {
    return res.status(404).send({
      message: 'Cette partie n\'existe pas'
    })
  }

  const params = getParamForFile('stella-match', req.file)
  s3.upload(params, async (err, { Location }) => {
    if (err) {
      return res.status(400).send({
        message: 'Error importing image to AWS'
      })
    }

    try {
      await Game.findByIdAndUpdate(gameId, {
        $push: { medias: Location }
      })

      return res.status(200).send({
        message: 'Image bien ajoutée !'
      })
    } catch (e) {
      return res.status(500).send({
        message: 'Erreur lors de l\'ajout d\'une image'
      })
    }
  })
}
