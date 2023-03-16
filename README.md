# node.js

## PM2

PM2는 Node.js 어플리케이션을 쉽게 관리할 수 있게 해주는 Process Manager이다.

```console
npm i pm2 -g
```

```console
pm2 start [파일명] --watch
```

입력 시 수정 사항을 저장했을 경우 곧바로 홈페이지에 반영된다.

```console
pm2 log
```

입력 시 문제점을 바로 확인할 수 있다.
