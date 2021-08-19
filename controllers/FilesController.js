const HttpError = require('../middleware/http-errors')
const fs = require('fs')

exports.getAllFiles = (request, response, next) => {
	const directoryPath = __basedir + '/upload/images/'

	fs.readdir(directoryPath, (error, files) => {
		if (error) {
			const err = new HttpError('Unable to scan the files!', 500)
			return next(err)
		}

		let fileInfos = []

		files.map((file) => {
			fileInfos.push({
				filename: file,
			})
		})
		response.status(200).json(fileInfos)
	})
}

exports.downloadFile = (request, response, next) => {
	const directoryPath = __basedir + '/upload/images/'
	const filename = request.params.filename

	response.download(directoryPath + filename, filename, (error) => {
		if (error) {
			const err = new HttpError('Could not download the file.', 500)
			return next(err)
		}
	})
}
