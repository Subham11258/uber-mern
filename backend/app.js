const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./db/db');
const express = require('express');
const app = express();
const cors = require('cors');
connectToDb();
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello world');
});

module.exports = app;