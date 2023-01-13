const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
};

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
};

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value);
};

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
};

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // socket.emit("enter_room", { payload:input.value }, () => {
    //     console.log("server is done!");
    // });
    // front에서 정의한 함수를 back에서 제어할 수 있다.
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);



socket.on("welcome", (user) => {
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left ㅜㅜ`);
});

socket.on("new_message", addMessage);

























// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// }


// socket.addEventListener("open", () => {
//     console.log("Connected to Server ✔");
// });

// socket.addEventListener("message", (message) => {
//     // console.log("New message : ", message);
//     // console.log("New message : ", JSON.parse(message)); 
//     console.log(message);
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);   
// });

// socket.addEventListener("close", () => {
//     console.log("Disconnected to Server ❌");
// });


// function handleSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     // console.log(message);
//     const li = document.createElement("li");
//     li.innerText = `You : ${input.value}`;
//     messageList.append(li);
//     input.value = "";
// };

// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
// };

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);

// // setTimeout(() => {
// //     socket.send("hello from the browser!");
// // }, 10000);