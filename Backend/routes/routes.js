const express = require('express')
const router = express.Router()
const {uploadCode , downloadCode} = require('../controllers/fileController')
const { upload } = require('../utils/upload')

router.post("/upload" ,upload.single("file"), uploadCode);

router.get("/file/:fileId", downloadCode);

module.exports = router