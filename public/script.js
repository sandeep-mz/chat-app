const socket = io();
// socket.emit("joinChat", username);
  
let username = "";
const joinChatButton = document.getElementById("join-chat");
const userNameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.querySelector(".messages-container");

joinChatButton.addEventListener("click", (event) => {
  event.preventDefault(); // this is stopping the default behav of form
  //   that is refresh //   it also removing the required attribute
  event.stopPropagation(); // this is stopping event bubbling
  username = userNameInput.value;
  console.log(username);
  if (username) {
    socket.emit("joinChat", username); // Emit 'joinChat' event with the username
    form.style.display = "none";
    chatRoomContainer.style.display = "block";
  }
});

function renderMessage(dataObj, typeOfMsg) {
  // <div class="message">hey (recieved message)</div>
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${dataObj.username} : ${dataObj.message}`;
  if (typeOfMsg === "SENT") {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message");
  }
  messageContainer.append(msgDiv);
  messageInput.value = "";
  messageInput.focus();
}

// Event listener for new user joining
socket.on("userJoined", (username) => {
  const joinMessage = document.createElement("div");
  joinMessage.innerText = `${username} the chat`;
  joinMessage.classList.add("user-join"); // Apply CSS class for user join message
  messageContainer.append(joinMessage);
});

// Event listener for user exiting
socket.on("userLeft", (username) => {
  const leaveMessage = document.createElement("div");
  leaveMessage.innerText = `${username} the chat`;
  leaveMessage.classList.add("user-leave"); // Apply CSS class for user leave message
  messageContainer.append(leaveMessage);
});


// Event Listener for receiving a message from another user
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let data = {
    id: socket.id,
    message: messageInput.value,
    username: username,
  };
  socket.emit("this is a msg event", data);
  renderMessage(data, "SENT");
}); 
// Event listener to receive messages from other users
socket.on("this is a msg event", (data) => { 
  if (socket.id !== data.id) {
    renderMessage(data, "REC");
  }
});

