const http = require('http').createServer(handler); //require http server, and create server with function handler()
const fs = require('fs'); //require filesystem module
const io = require('socket.io')(http) //require socket.io module and pass the http object (server)

http.listen(8080); //listen to port 8080

// WebSocket Connection
io.sockets.on('connection', function (socket) {
    var lightvalue = 0; //static variable for current status
    socket.on('light', function (data) { //get light switch status from client
        lightvalue = data;
        if (lightvalue) {
            console.log(lightvalue); //turn LED on or off, for now we will just show it in console.log
        }
    });
});

// Create server
function handler(req, res) { 
    fs.readFile(__dirname + '/public/index.html', function (err, data) { //read file index.html in public folder
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' }); //write HTML
        res.write(data); //write data from index.html
        return res.end();
    });
}