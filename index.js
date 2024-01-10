const fs = require('fs');
const http = require('http')
const url = require('url')
const {replaceTemplate} = require('./modules/replaceTemplate')

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);
// SERVER
const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') { // OVERVIEW
        res.writeHead(200, {
            'Content-type': 'text/html',
        });

        const cardHtml = productData.map(product => replaceTemplate(templateCard, product)).join('')
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(output)
    } else if (pathname === '/product') { // PRODUCT
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const product = productData[query.id];
        const output = replaceTemplate(templateProduct, product);

        res.end(output)
    } else if (pathname === '/api') { // API
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)
    } else { // NOT FOUND
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page not found!</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on 8000!');
})
