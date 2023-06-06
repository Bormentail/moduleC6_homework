const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 3000});

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    wsClient.send('Привет, Вы подключились.');

    wsClient.on('message', function(message) {
        wsClient.send("" + message);
        console.log("" + message);
    });
}

console.log("Сервер запущен");