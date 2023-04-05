console.log("main.js")

let http = require('http')
let fs = require('fs')
let url = require('url');

let app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  if (_url == '/') {
    _url = '/index.html'
  }
  if (req.url == '/favicon.ico') {
    return res.writeHead(404)
  }
  res.writeHead(200)
  res.end(queryData.id)
})

app.listen(1000)