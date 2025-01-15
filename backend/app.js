const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./db/db');
const express = require('express');
const app = express();
const cors = require('cors');
connectToDb();
app.use(cors());
const userRoutes = require('./routes/user.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users',userRoutes);



module.exports = app;