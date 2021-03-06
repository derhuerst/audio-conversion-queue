'use strict'

const os = require('os')
const createQueue = require('queue')
const path = require('path')
const shell = require('any-shell-escape')
const {exec} = require('child_process')
const fs = require('fs')

const simpleSrcToDest = require('./simple-src-to-dest')

const dir = os.tmpdir()
const noop = () => {}

const defaultArgs = [
	'-acodec', 'mp3', '-format', 'mp3'
]

// todo: use a cache, with dest as key
const createConversionQueue = (srcToDest = simpleSrcToDest, ffmpegArgs = defaultArgs) => {
	if (Array.isArray(srcToDest)) {
		ffmpegArgs = srcToDest
		srcToDest = simpleSrcToDest
	}

	const q = createQueue({autostart: true})

	const convert = (src, converted) => {
		srcToDest(src, (err, dest) => {
			if (err) return converted(err)
			dest = path.join(dir, dest)

			const purge = (cb = noop) => {
				fs.unlink(dest, cb)
			}

			const task = (taskDone) => {
				const cmd = shell([
					'ffmpeg', '-y', '-v', 'error',
					'-i', src,
					'-vn', ...ffmpegArgs,
					dest
				])
				exec(cmd, (err) => {
					if (err) {
						taskDone(err)
						converted(err)
					} else {
						taskDone()
						converted(null, dest, purge)
					}
				})
			}
			q.push(task)
		})
	}

	return {convert}
}

module.exports = createConversionQueue
