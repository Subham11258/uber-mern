const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT)
    .then((val)=>{console.log("Mongodb connected to the server",val)})
    .catch((err)=>{
        console.log("Error occured while connecting to the database ",err)
    })
}

module.exports = connectToDb;