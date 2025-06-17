const File = require('../models/fileschema')
const dotenv = require('dotenv')
dotenv.config()

const uploadCode = async (req, res) => {
    console.log('File upload request received');
    console.log('Request file:', req.file);
    
    if (!req.file) {
        console.log('No file found in request');
        return res.status(400).json({ error: "No file uploaded" });
    }

    const fileObj = {
        name: req.file.originalname,
        path : req.file.path,
    }
    
    console.log('Attempting to save file:', fileObj.name);

    try {
        const file = await File.create(fileObj)
        console.log('File saved successfully:', file._id);
        res.status(200).json({
            success: true,
            message: "File Uploaded Successfully",
            path: `http://localhost:${process.env.PORT}/file/${file._id}`
        });
    } catch (error) {
        console.error("Upload error details:", error);
        res.status(500).json({
            success: false,
            error: "Failed to upload file"
        });
    }
}

const downloadCode = async (req, res) => {
    try {
        const fileId = req.params.fileId;
    const file = await File.findById(fileId);
    if(!file){
        return res.status(404).json({ error: "File not found" });
    }
    res.download(file.path, file.name);
    file.downloadCount++;
    await file.save();
    
    res.status(200).json({
        success: true,
        message: "File Downloaded Successfully"
    });
    } catch (error) {
        console.log(error.message);
        
    }

}

module.exports = { uploadCode , downloadCode };
