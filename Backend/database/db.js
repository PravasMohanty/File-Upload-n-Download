const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;