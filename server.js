const express = require('express')
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT 

const app = express();

//middleware
app.use(express.json());
app.use(cors());


//socket.io configuration
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors:{
    origin: "*",
    methods: ["GET", "POST"],
    },
});


// socket.io connection 
io.on('connection', (socket) => {
    //console.log('a user connected');

    socket.on('disconnect', () => {
        //console.log('user disconnected');
      });

      socket.on('join', ({name, room})=>{
        socket.join(room);

        const  user  = {name, room};

       /* socket.emit('message', {
           
            //data: {user: "admin", message: ` ${user.name} let play and have fun!`},
        });

        socket.broadcast.to(user.room).emit('message', {
            //data: {user: "admin", message:`${user.name} has joined`}
        });*/
    })

     //play
     socket.on("play", ({user, room, block, choix})=>{

            io.to(room).emit('message', {
                data:  {user, room, block, choix} 
            });
       // console.log({block, choix, room})
    });
      
  });


// routes
app.get('/', (req, res) => {
    return res.json("Hello World!");
});

//server listening
server.listen(PORT, ()=> console.log("server listening on port:", PORT));