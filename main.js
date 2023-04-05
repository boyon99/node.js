let http = require('http')
let fs = require('fs')
let url = require('url');

// template HTML
function templateHTML(title, list, body) {
  return `
  <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      ${body}
    </body>
    </html>
      `
}

// template list
function templateList(filelist) {
  // 반복문을 통해 list에 저장
  let list = '<ul>'
  for (let i = 0; i < filelist.length; i++) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
  }
  list += "</ul>"
  return list
}

let app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  // 정상적으로 로드된 경우
  if (pathname === '/') {
    // 루트 경로인 경우
    if (queryData.id === undefined) {
      // 데이터 폴더 안에 있는 파일이름을 배열 형식으로 가져오기
      fs.readdir('./data', function (err, filelist) {
        let list = templateList(filelist)
        // title
        let title = "Welcome"
        let description = "Hello, Node.js"
        let template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        res.end(template)
      })

    } else {
      // 파일 안에 데이터를 description란 이름으로 저장
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        // 데이터 폴더 안에 있는 파일이름을 배열 형식으로 가져오기
        fs.readdir('./data', function (err, filelist) {
          let list = templateList(filelist)
          // title
          let title = queryData.id
          let template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          res.end(template)
        })
      })
    }
  } else if (pathname === '/create') {
    if (queryData.id === undefined) {
      // 데이터 폴더 안에 있는 파일이름을 배열 형식으로 가져오기
      fs.readdir('./data', function (err, filelist) {
        let list = templateList(filelist)
        // title
        let title = "WEB - create"
        let description = "Hello, Node.js"
        let template = templateHTML(title, list, `
          <form action="http://localhost:1000/create_process" method="post">
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>         
        </form>
        `);
        res.end(template)
      })
    }
  }
  // create_process인 경우
  else if (pathname === '/create_process') {
    var body = '';
    // post로 전송한 데이터 받기
    req.on('data', function (data) {
      body += data;
    })

    req.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        res.writeHead(200)
        console.log(err)
        res.end('success')
      })
    })
  }
  // 그 외에 경로인 경우
  else {
    res.writeHead(200)
    res.end('not found')
  }
})

app.listen(1000)