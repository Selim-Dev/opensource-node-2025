const express = require('express')
var morgan = require('morgan')
require('express-async-errors');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const port = 4000
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan("dev"))


app.use('/users',userRoutes)
app.use('/posts',postRoutes)



mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('connected to db succesfully')
}).catch(err=>{
  console.error('error connecting to database')
  process.exit(1)
})




app.use((err,req,res,next)=>{
	console.log("From Inside Global Error Hanlder",err);
	res.status(err.statusCode || 500).send({
		statusCode: err.statusCode || 500,
		message: err.message || "something went wrong",
		errors: []
	})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})