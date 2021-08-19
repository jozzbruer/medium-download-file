const express = require('express')
const fs = require('fs')
const path = require('path')

const HttpError = require('./middleware/http-errors')
const filesRoute = require('./routes/FilesRoute')

global.__basedir = __dirname

const app = express()

// Handling CORS, You can also use the npm package for that
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	)
	next()
})

app.use('/api', filesRoute)

app.use((request, response, next) => {
	const error = new HttpError('We cannot find this route', 404)
	return next(error)
})

app.use((error, request, response, next) => {
	if (request.file) {
		fs.unlink(request.file.path, (error) => {
			console.log(error)
		})
	}
	if (response.headerSent) {
		return next(error)
	}
	response.status(error.code || 500)
	response.json({ Messages: error.message || 'An unknown error occured' })
})

module.exports = app
