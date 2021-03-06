# audio-conversion-queue

**Convert audio files temporarily, on the fly.**

[![npm version](https://img.shields.io/npm/v/audio-conversion-queue.svg)](https://www.npmjs.com/package/audio-conversion-queue)
[![build status](https://api.travis-ci.org/derhuerst/audio-conversion-queue.svg?branch=master)](https://travis-ci.org/derhuerst/audio-conversion-queue)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/audio-conversion-queue.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install audio-conversion-queue
```


## Usage

```js
const createConversionQueue = require('audio-conversion-queue')

const queue = createConversionQueue()

queue.convert('/path/to/audio.m4a', (err, dest, purge) => {
	if (err) return console.error(err)

	console.info('the converted MP3 file is at', dest)
	// do something with the file…
	// when you don't need it anymore, delete it:
	purge((err) => {
		if (err) console.error(err)
	})
})
```


## API

```js
const queue = createConversionQueue(srcToDest = defaultSrcToDest, ffmpegArgs = ['-acodec', 'mp3', '-format', 'mp3'])
```

Pass a custom `createConversionQueue(src, cb)` function that, given the source path `src` (e.g. `/path/to/audio.m4a`), calls `cb` with the path of the MP3 destination file (e.g. `/path/to/audio-4f2f.mp3`). You could also use the hash of the source file.

Pass an array of strings for `ffmpegArgs` to customize the conversion. Refer to the [`ffmpeg` docs](https://ffmpeg.org/ffmpeg.html) for details.


## Contributing

If you have a question or have difficulties using `audio-conversion-queue`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/audio-conversion-queue/issues).
