const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
})
const File = mongoose.model('File', FileSchema)
module.exports = File
