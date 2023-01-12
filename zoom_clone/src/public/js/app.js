const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
    console.log(`The backend says: `, msg);
};

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // socket.emit("enter_room", { payload:input.value }, () => {
    //     console.log("server is done!");
    // });
    // front에서 정의한 함수를 back에서 제어할 수 있다.
    socket.emit("enter_room", { payload:input.value }, backendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

































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