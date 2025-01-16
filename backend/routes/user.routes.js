const express = require('express');
const userController = require('../controllers/user.controller');
const {body} = require('express-validator');
const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage
    ("First must be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long'),
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long')
],
userController.loginUser);

module.exports = router; 