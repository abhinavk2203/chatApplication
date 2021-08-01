const express = require('express')
const app = express()

const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT} `)
})

app.use(express.static(__dirname + '/public'))

app.get("/", function(req, res){

    res.sendFile(__dirname + '/index.html')
})

//socket code

// import the socket.io and initialise with http server
const io = require('socket.io')(http)

//as soon as browser connects, socket.io detects the connection
io.on('connection', function(socket){
    console.log("connected")

    //listen the emitted message from client.js, msg = message from client
    socket.on('message', function(msg){

        //we have to send this msg to all the browsers/clients
        socket.broadcast.emit('message', msg) //sends the msg to everyone expect the one who wrote it

    })  

})
