const http = require('http');
const fs = require('fs');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	
	const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
	console.log(slugs);
	
	const {query, pathname} = url.parse(req.url, true);
	
	//Overview page
	if (pathname === '/' || pathname === '/overview') {
		
		res.writeHead('200', {
			'Content-type': 'text/html',
		});
		
		const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output)
		
		
		// Product page
	} else if (pathname === '/product') {
		res.writeHead('200', {
			'Content-type': 'text/html',
		});
		const product = dataObj[query.id];
		const output = replaceTemplate(tempProduct, product);
		res.end(output)
		
	} else if (pathname === '/api') {
		res.writeHead('200', {
			'Content-type': 'application/json',
		});
		// fs.readFile(`./dev-data/data.json`,'utf-8',(error,data) => {
		// 	res.end(data)
		// })
		res.end(data);
		
	} else {
		res.writeHead('404', {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		});
		res.end("<h1>404: Page not found</h1>")
	}
	
	
})

server.listen('3000', '127.0.0.1', () => {
	console.log('Listening to request on port 3000')
});