const fs = require('fs');
const http = require('http');


const server = http.createServer();




server.on("request",(req,res)=>{
	// first solution
	// fs.readFile("test-stream.txt",(err,data)=>{
	// 	res.end(data);
	// })
	// Second Solution : Streams
			//1. create readable stream
			// const readable = fs.createReadStream("test-stream.txt")
			// //2. write the response to the client
			// readable.on("data",chunk=>{
			// 	res.write(chunk)
			// })
			// readable.on("end",()=>{
			// 	res.end();
			// })
			// readable.on("error",(err)=>{
			// 	res.statusCode= 500;
			// 	res.end("file not found (wrong name)");
			// })
		// Third Solution 
		const readable = fs.createReadStream("video.mp4")
		readable.pipe(res)

})

server.listen(5000,'localhost',()=>{
	console.log('server listening on port 5000')
})