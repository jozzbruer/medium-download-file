const express = require('express')

const router = express.Router()

const fileCtrl = require('../controllers/FilesController')

router.get('/files', fileCtrl.getAllFiles)
router.get('/files/:filename', fileCtrl.downloadFile)

module.exports = router
