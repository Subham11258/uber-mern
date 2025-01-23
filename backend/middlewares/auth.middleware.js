const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
require('dotenv').config();
module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'token not available'});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message:'user is blacklisted'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({message:err.message});
    }
}

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message:'unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
    }
    catch(err){
        return res.status(401).json({message:'unauthorized'});
    }
}
