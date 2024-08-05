// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// function Chat() {
//   const SOCKET_URL = "http://localhost:4000";
//   const socket = io(SOCKET_URL);

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [name, setName] = useState("");
//   const [username, setusername] = useState();
//   const [room, setroom] = useState();
//   const [roomVar, setroomVar] = useState();
//   const [getprivateVar, setGetprivateVar] = useState();

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("receive_message", (newMessage) => {
//       // Only update messages if the message is for the current user
//       setMessages((prevMessages) => [...prevMessages, newMessage.message]);
//     });
//     socket.on("get_name", (newname) => {
//       //   alert(`welcome ^^^ ${newname}`);
//       setusername(newname);
//     });

//     // Connect event
//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("receiver_msg", function (data) {
//       console.log("Incoming message:", data);
//     });
//     socket.on("userJoined", function (data) {
//       //   console.log("Incoming message:", data);
//       alert("another user joinded");
//     });

//     socket.on("get_var", function (data) {
//       alert("Room value") ;
//       setGetprivateVar(data);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     if (message) {
//       // Emit the message to the server along with the receiver's username
//       socket.emit("send_message", { message });
//       setMessage(""); // Clear the input field
//     }
//   };

//   const handleName = () => {
//     if (name) {
//       socket.emit("set_name", name);
//     }
//   };

//   function handleRoom() {
//     socket.emit("join_room", room);
//   }

//   function handleRoomVar() {
//       socket.emit("room_var", {room , roomVar});
//   }
//   return (
//     <div>
//       <h1>Chat Application</h1>
//       {getprivateVar && <div> Value is {getprivateVar} </div>}
//       <div>
//         <input
//           type="text"
//           value={roomVar}
//           onChange={(e) => setroomVar(e.target.value)}
//           placeholder="Private var Var"
//         />
//         <button onClick={handleRoomVar}>send priv var </button>
//       </div>

//       {username && <h1>Hello {username}</h1>}
//       <div>
//         <input
//           type="text"
//           value={room}
//           onChange={(e) => setroom(e.target.value)}
//           placeholder="Enter your romm"
//         />
//         <button onClick={handleRoom}>Join </button>
//       </div>

//       <div>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter your name"
//         />
//         <button onClick={handleName}>Join </button>
//       </div>

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message"
//       />

//       <button onClick={sendMessage}>Send Message</button>
//       <div>
//         <h2>Messages:</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Chat;


// ------

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// function Chat() {
//   const SOCKET_URL = "http://localhost:4000";
//   const socket = io(SOCKET_URL);

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [roomVar, setRoomVar] = useState("");
//   const [getPrivateVar, setGetPrivateVar] = useState("");

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("receive_message", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage.message]);
//     });

//     socket.on("get_name", (newName) => {
//       setUsername(newName);
//     });

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("receiver_msg", (data) => {
//       console.log("Incoming message:", data);
//     });

//     socket.on("userJoined", (data) => {
//       console.log("User joined room:", data);
//       alert("Another user joined");
//     });

//     socket.on("get_var", (data) => {
//       console.log("Room value:", data);
//       setGetPrivateVar(data);
//       alert("Room value received");
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     if (message) {
//       socket.emit("send_message", { message });
//       setMessage(""); // Clear the input field
//     }
//   };

//   const handleName = () => {
//     if (name) {
//       socket.emit("set_name", name);
//     }
//   };

//   const handleRoom = () => {
//     if (room) {
//       socket.emit("join_room", room);
//       console.log(`Attempting to join room: ${room}`);
//     } else {
//       console.error("Room name is required to join a room.");
//     }
//   };

//   const handleRoomVar = () => {
//     if (room) {
//       socket.emit("room_var", { room, roomVar });
//       console.log(`Emitting room variable: ${roomVar} to room: ${room}`);
//     } else {
//       console.error("No room is joined yet.");
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Application</h1>
//       {getPrivateVar && <div>Value is {getPrivateVar}</div>}
//       <div>
//         <input
//           type="text"
//           value={roomVar}
//           onChange={(e) => setRoomVar(e.target.value)}
//           placeholder="Private var"
//         />
//         <button onClick={handleRoomVar}>Send Private Var</button>
//       </div>

//       {username && <h1>Hello {username}</h1>}
//       <div>
//         <input
//           type="text"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           placeholder="Enter your room"
//         />
//         <button onClick={handleRoom}>Join Room</button>
//       </div>

//       <div>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter your name"
//         />
//         <button onClick={handleName}>Set Name</button>
//       </div>

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message"
//       />

//       <button onClick={sendMessage}>Send Message</button>
//       <div>
//         <h2>Messages:</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Chat;


// --------
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const SOCKET_URL = "http://localhost:4000";
  const socket = io(SOCKET_URL);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [roomVar, setRoomVar] = useState("");
  const [getPrivateVar, setGetPrivateVar] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage.message]);
    });

    socket.on("get_name", (newName) => {
      setUsername(newName);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("receiver_msg", (data) => {
      console.log("Incoming message:", data);
    });

    socket.on("userJoined", (data) => {
      console.log("User joined room:", data);
      alert("Another user joined");
    });

    socket.on("get_var", (data) => {
      console.log("Room value:", data);
      setGetPrivateVar(data);
      alert("Room value received");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message });
      setMessage(""); // Clear the input field
    }
  };

  const handleName = () => {
    if (name) {
      socket.emit("set_name", name);
    }
  };

  const handleRoom = () => {
    if (room) {
      socket.emit("join_room", room);
      console.log(`Attempting to join room: ${room}`);
    } else {
      console.error("Room name is required to join a room.");
    }
  };

  const handleRoomVar = () => {
    if (room) {
      socket.emit("room_var", { room, roomVar });
      console.log(`Emitting room variable: ${roomVar} to room: ${room}`);
    } else {
      console.error("No room is joined yet.");
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      {getPrivateVar && <div>Value is {getPrivateVar}</div>}
      <div>
        <input
          type="text"
          value={roomVar}
          onChange={(e) => setRoomVar(e.target.value)}
          placeholder="Private var"
        />
        <button onClick={handleRoomVar}>Send Private Var</button>
      </div>

      {username && <h1>Hello {username}</h1>}
      <div>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter your room"
        />
        <button onClick={handleRoom}>Join Room</button>
      </div>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleName}>Set Name</button>
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />

      <button onClick={sendMessage}>Send Message</button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
