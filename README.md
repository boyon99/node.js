# node.js

## PM2

PM2는 Node.js 어플리케이션을 쉽게 관리할 수 있게 해주는 Process Manager이다.

> PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.

### 설치하기

```console
npm i pm2 -g
```

### PM2 명령어

#### 시작하기

```console
pm2 start <파일명> [--watch]
```

start를 통해 앱을 실행시킨다. `—watch`를 통해 현재 디렉토리와 그 하위 폴더의 파일을 실시간으로 감시하고 파일을 수정하면 서버를 재실행한다. 수동으로 서버를 재실행하지 않고, 새로고침만으로 확인할 수 있다.

#### 종료하기

```console
pm2 stop <파일명>
pm2 delete <파일명>
pm2 kill
```

`stop`을 통해 프로세스를 중지하고 `delete`를 통해 프로세스를 삭제할 수 있다. `kill`을 통해 pm2를 종료한다.

#### 확인하기

```console
pm2 log [<파일명>]
pm2 list
pm2 monit

```

`log`을 통해 작업한 로그를 실시간으로 확인할 수 있으며 `list`를 통해 관리하고 있는 파일을 확인할 수 있다. `monit`를 통해 메모리/CPU의 사용량을 확인한다.
