

const express = require('express')
const fs = require('fs').promises
const path = require('path');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/user.controller')
const Joi = require("joi");



const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const validateSignIn  = (req,res,next)=>{
  const {error} = loginSchema.validate(req.body)
  if(error) return next(new AppError(error.details[0].message,400, error.details))
	next()
}

// users apis
router.get('/', async (req,res,next)=>{
		const users  = await User.find();
		res.send(users)
})


router.get('/:id',(req,res)=>{
	res.send('first users')
})
//singup
router.post('/',userController.signup)

router.post('/login',validateSignIn,userController.login)
router.put('/:id',(req,res)=>{
	console.log("Body:", req.body)
	res.send('success')
})

router.delete('/:id',(req,res)=>{
	console.log("Body:", req.body)
	res.send('success')
})

module.exports = router;