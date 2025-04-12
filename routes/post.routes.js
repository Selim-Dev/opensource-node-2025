

const express = require('express');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();



const verifyUser = async (req,res,next)=>{
	//1) get token from headers
	const token = req.headers.authorization;
	if(!token) return next(new AppError("please provide token",403)) //unauthorized
	//2) verify token (jwt - secret) return payload
	const payload = jwt.verify(token,process.env.JWT_SECRET) // {email}
	// 3) get user from the database 
	const user = await User.findOne({email:payload.email})
	if(!user) return next(new AppError("invalid token",403)) //unauthorized
	//4) attach authenticated user to the request object req.user
	req.user = user
	next()
}

router.post('/',verifyUser,(req,res)=>{
	console.log(req.user)
	console.log("Body:", req.body)
	res.send('success')
})


// posts apis
router.get('/',(req,res)=>{
	res.send('success')
})
router.get('/:id',(req,res)=>{
	res.send('success')
})

router.put('/:id',(req,res)=>{
	console.log("Body:", req.body)
	res.send('success')
})

router.delete('/:id',(req,res)=>{
	console.log("Body:", req.body)
	res.send('success')
})

module.exports = router;

