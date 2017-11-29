'use strict'

const path = require('path')
const randomId = require('crypto-random-string')

const simpleSrcToDest = (src, cb) => {
	const filename = path.basename(src)
	const suffixed = [
		path.basename(filename, path.extname(filename)),
		'-', randomId(5),
		'.mp3'
	].join('')

	setImmediate(cb, null, suffixed)
}

module.exports = simpleSrcToDest
