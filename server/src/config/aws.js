const AWS = require('aws-sdk')
const fs = require('fs')

/**
 * Celui qui met mes keys en clair je lui arrache la tête
 */
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-2'
})

const s3 = new AWS.S3({ region: 'eu-west-2' })

const getParamForFile = (bucketName, { filename, path }) => {
  const stream = fs.createReadStream(path)

  return {
    Bucket: bucketName,
    Key: filename,
    ContentType: 'image/png',
    ACL: 'public-read',
    Body: stream
  }
}

module.exports = {
  s3,
  getParamForFile
}
