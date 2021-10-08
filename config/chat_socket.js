module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket user left...");
    });

    socket.on("join_room", function (data) {
      console.log("joining req received. ", data);
      // user will join to given chatroom  && if no chatroom present then it will create new chatroom.
      socket.join(data.chatroom);

      // io.emit("user_joined", data);
      //
      // if we want to emit in specific chatroom the we use io.in(CHATROOM_NAME).emit('event name')
      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message", function (data) {
      // console.log(data);
      io.in(data.chatroom).emit("received_message", data);
    });
  });
};
