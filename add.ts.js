wss.on('connection', (ws: ExtWebSocket) => {

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        //[...]
    }
});

setInterval(() => {
    wss.clients.forEach((ws: ExtWebSocket) => {

        if (!ws.isAlive) return ws.terminate();

        ws.isAlive = false;
        ws.ping(null, false, true);
    });
}, 10000);

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});