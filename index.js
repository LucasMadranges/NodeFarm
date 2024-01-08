const fs = require('fs');
const http = require('http')

// FILES
// Blocking, synchronous way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`
console.log(textOut)
fs.writeFileSync('./txt/output.txt', textOut)
console.log('file written!')
 */

/*
// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        console.log(data2)
        fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
            console.log(data3)

            fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', (error) => {
                console.log('Your file as been written');
            })
        })
    })
})
console.log('Will read file!')
 */

// SERVER
const server = http.createServer((req, res) => {
    res.end('Hello from the server!')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on 8000!');
})
