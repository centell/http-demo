const http = require('http');

http.createServer((req, res) => {
  const { headers, method, url } = req;
  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const responseBody = { headers, method, url, body };

    res.write(JSON.stringify(responseBody));

    res.on('error', err => {
      console.error(err);
    });

    res.end();
  })
}).listen(8080);
