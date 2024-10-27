const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    console.log('Query Parameters:', query);

    if (pathName === '/add') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ operation: 'Add', query: query, result: +query.a + +query.b }));
    } else if (pathName === '/subtract') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ operation: 'Subtract', query: query, result: query.a - query.b }));
    } else if (pathName === '/multiply') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ operation: 'Multiply', query: query, result: query.a * query.b }));
    } else if (pathName === '/divide') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ operation: 'Divide', query: query, result: query.a / query.b }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({message: `option not allowed: /${pathName}`}));
    }

});

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
