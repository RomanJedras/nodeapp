const http = require('http');
const os = require("os");
const fs = require('fs');
const url = require('url');


const server = http.createServer((req,res) => {
	const pathName = req.url;
	
	if (pathName === '/' || pathName === '/updateNote/test') {
		res.writeHead('200', {
			'Content-type': 'text/html',
			'my-own-header': 'json-code'
		});
		res.end('<h1>Hello from server with path updateNote</h1>')
		
	} else if (pathName === '/products') {
		res.writeHead('200', {
			'Content-type': 'text/html',
		});
		res.end('<h1>Hello from products</h1>')
	} else if (pathName === '/api') {
		res.writeHead('200', {
			'Content-type': 'application/json',
		});
		fs.readFile(`./dev-data/data.json`,'utf-8',(error,data) => {
			const productData = JSON.parse(data)
			res.end(data)
		})
		
		
	} else {
		res.writeHead('404',{
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		});
		res.end("<h1>404: Page not found</h1>")
	}
	
	
})

server.listen('3000','127.0.0.1',()=>{
	console.log('Listening to request on port 3000')
});