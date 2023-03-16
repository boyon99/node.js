let http = require('http')
let fs = require('fs')
let url = require('url');

let app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;
  let title = queryData.id

  if (pathname === '/') {
    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      let template = /* HTML */`
  <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      ${description}
    </body>
    </html>
      `
      res.end(template)
    })
  } else {
    res.writeHead(200)
    res.end('not found')
  }


})

app.listen(1000)