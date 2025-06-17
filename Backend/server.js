const express = require('express')
const app = express()
const dotenv = require('dotenv');
const router = require('./routes/routes');
const ConnectDB = require('./database/db');
dotenv.config();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    console.error('Stack trace:', err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Something went wrong!'
    });
});

ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});