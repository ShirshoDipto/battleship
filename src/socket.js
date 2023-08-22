const { io } = require("socket.io-client");

export const socket = io(`${process.env.SERVER}`, {
  autoConnect: false,
});
