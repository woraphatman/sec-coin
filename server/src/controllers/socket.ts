import socketIO from "socket.io";

export let ioSocket: any;

export const socket = (server: any) => {
  const io = new socketIO.Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (client) => {
    console.log("client connected");

    client.on("disconnect", () => {
      console.log("client disconnected");
    });
    client.on("message", function (message) {});
  });
  ioSocket = io;

  return io;
};
