# Socket.io-Room-Chat

Made to "Projet Tuteuré" in LP IRM.

Ionic App Chat app with rooms work thanks to websocket server in Node JS and Socket.io.


## How to use it

### Server

1. Do the `npm i` to install project dependencies.
2. Launch websocket server with `npm run start` command.
3. The server will be available to localhost:3000 (yourip:3000)

### Ionic Application

1. Do the `npm i` to install project dependencies.
2. Use `ionic serve --lab` to test magic of websocket
3. Modify the socket adress server in SocketIoConfig in [client/src/app/app.module.ts](client/src/app/app.module.ts) file
3. And use `ionic run android` or `ionic run ios` to test on your mobile.

## Librairies

* Ionic
* NodeJS
* Socket.io
* ng-socket-io



