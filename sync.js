// sample.txt의 내용을 B라고 가정한다.
var fs = require('fs');

// 동기적 - readFileSync
console.log('A');
var result = fs.readFileSync('sample.txt', 'utf8');
console.log(result);
console.log('C');
// A - B - C 순으로 출력된다.


// 비동기적 - readFile
console.log('A');
fs.readFile('sample.txt', 'utf8', function (err, result) {
  console.log(result);
});
console.log('C');
// // A - C - B 순으로 출력된다.