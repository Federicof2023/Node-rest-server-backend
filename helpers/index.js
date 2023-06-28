const dbvalidators = require('./db.validators')
const generateJWT = require('./generate-JWT')
const googleVerify = require('./google-verify')
const helperUploadfiles = require('./upload-files')


module.exports = {
  ...dbvalidators,
  ...generateJWT,
  ...googleVerify,
  ...helperUploadfiles
}