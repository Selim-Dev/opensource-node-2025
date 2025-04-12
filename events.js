const EventEmitter = require('events');
const http = require('http')

class Orders extends EventEmitter {
	constructor(){
		super();
	}
}

const myEmitter = new Orders();

myEmitter.on('newOrder',()=>{
	console.log('new order received: from mohamed');
})

myEmitter.on('newOrder',()=>{
	console.log('new order received: from ali');
})

myEmitter.on('newOrder',(totalValue)=>{
	console.log(`there is new Order with value ${totalValue}`);
})


myEmitter.emit('newOrder',50)



/***************************************** Server   ******************************/

const server = http.createServer();

server.on('request',(req,res)=>{
	console.log('request received');
	console.log('request', req.method, req.url)
	res.end('Request Received')
})


// server.on('request',(req,res)=>{

// })



server.listen(4000,'localhost',()=>{
	console.log("server is listening on port 4000")
})