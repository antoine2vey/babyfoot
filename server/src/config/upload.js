var multer = require('multer')
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.png')
  }
})

module.exports = {
  upload: multer({ storage })
}
