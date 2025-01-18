const dotenv = require('dotenv');
dotenv.config();
const connectToDb = require('./db/db');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
connectToDb();
app.use(cors());
app.use(cookieParser());
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users',userRoutes);
app.use('/captains',captainRoutes);


module.exports = app;