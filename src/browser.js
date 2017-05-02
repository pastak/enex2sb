require('babel-register')
require('babel-polyfill')

import main from './main'
import uploadImage from './browser/uploadImage'

export default main.bind(null, uploadImage)
