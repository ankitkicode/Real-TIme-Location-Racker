const express = require("express");
const { render } = require("express/lib/response");
const app = express()
const http = require('http');
const path = require("path");
const socketio= require("socket.io");
const server = http.createServer(app)
const io = socketio(server)

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")))


io.on("connection",function(socket){
    console.log("New WS Connection")
   socket.on("sendLocation",function(data){
    io.emit("recieveLocation",{id:socket.id, ...data})
   });
    socket.on("disconnect",function(){
        console.log("user-disconnect")
         io.emit("user-disconnect",{id:socket.id})
    })
});


app.get("/", (req, res) => {
    res.render("index")
})


server.listen(3000,function(){
    console.log("Server is running on port 3000")
})