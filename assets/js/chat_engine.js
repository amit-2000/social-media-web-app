class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
    });

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_Email: self.userEmail,
        chatroom: "codeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("user join ", data);
      });

      $("#send-message").click(function () {
        let msg = $("#chat-message-input").val();
        console.log("******************** ", msg, "***************");
        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_Email: self.userEmail,
            chatroom: "codeial",
          });
        }
      });
      self.socket.on("received_message", function (data) {
        console.log("New  message ", data);
        let newMessage = $("<li>");

        let messsageType = "other-message";

        if (data.user_Email == self.userEmail) {
          messsageType = "self-message";
        }
        newMessage.append(
          $("<span>", {
            html: data.message,
          })
        );
        newMessage.append(
          $("<sub>", {
            html: data.user_Email,
          })
        );
        newMessage.addClass(messsageType);

        $("#chat-messages-list").append(newMessage);
      });
    });
  }
}
