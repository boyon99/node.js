let http = require('http')
let fs = require('fs')
let url = require('url');

let app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    // 루트 경로인 경우
    if (queryData.id === undefined) {
      // 데이터 폴더 안에 있는 파일이름을 배열 형식으로 가져오기
      fs.readdir('./data', function (err, filelist) {
        // 반복문을 통해 list에 저장
        let list = '<ul>'
        for (let i = 0; i < filelist.length; i++) {
          list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        }
        list += "</ul>"
        // title
        let title = "Welcome"
        let description = "Hello, Node.js"
        let template = /* HTML */`
    <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        ${description}
      </body>
      </html>
        `
        res.end(template)
      })

    } else {
      // 파일 안에 데이터를 description란 이름으로 저장
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        // 데이터 폴더 안에 있는 파일이름을 배열 형식으로 가져오기

        fs.readdir('./data', function (err, filelist) {
          // 반복문을 통해 list에 저장
          let list = '<ul>'
          for (let i = 0; i < filelist.length; i++) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
          }
          list += "</ul>"
          // title
          let title = queryData.id
          let template = /* HTML */`
    <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        ${description}
      </body>
      </html>
        `
          res.end(template)
        })
      })
    }
  } else {
    res.writeHead(200)
    res.end('not found')
  }


})

app.listen(1000)