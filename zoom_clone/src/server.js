import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);  //http Server
const wss = new WebSocket.Server({ server });

// function handleConnection(socket) {
//     console.log(socket)
// }

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    sockets["nickname"] = "Anon";
    console.log("Connected to Browser ✔")
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        // console.log(parsed, message);

        switch(message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${message.toString}`));
                console.log(message.payload);
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                console.log(message.payload);
        };

        // if(message.type === "new_message") {
        //     sockets.forEach((aSocket) => aSocket.send(message.payload));
        // } else if(message.type === "nickname") {
        //     console.log(message.payload);
        // };

        



        // sockets.forEach((aSocket) => aSocket.send(JSON.stringify(message)));
        // console.log(message);
        // console.log(message.toString());
        // console.log(message.toString("utf-8"));
        // socket.send(message.toString("utf-8"));
    });
    // socket.send("hello!!!");
})

server.listen(3000, handleListen);