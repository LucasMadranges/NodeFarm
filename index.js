const fs = require('fs');
const http = require('http')
const url = require('url')


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);
// SERVER
const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    function replaceTemplate(temp, product) {
        let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
        output = output.replace(/{%IMAGE%}/g, product.image);
        output = output.replace(/{%PRICE%}/g, product.price);
        output = output.replace(/{%FROM%}/g, product.from);
        output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
        output = output.replace(/{%QUANTITY%}/g, product.quantity);
        output = output.replace(/{%DESCRIPTION%}/g, product.description);
        output = output.replace(/{%ID%}/g, product.id);

        if (!product.organic) {
            output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
        }
        return output;
    }


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
