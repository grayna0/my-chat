const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/MessageRoute");
const socket =require("socket.io");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message),"22";
  });



const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);


const io =socket(server, {
  cors: {

    origin: '*',
    credentials:true,
  
  }
});

 global.onlineUsers = new Map()
 io.on('connection', (socket) =>{
   global.chatSocket = socket
   console.log(socket);``
   socket.on("add-user", (userId) =>{
    onlineUsers.set(userId, socket.id)
  })
  socket.on("send-msg", (data) =>{
   const sendUserSocket = onlineUsers.get(data.to)
   if(sendUserSocket){
     socket.to(sendUserSocket).emit("msg-recieve", data.message)
   }
  })
 })
