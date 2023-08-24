const { io } = require("socket.io-client");

const socket = io(`${process.env.SERVER}`, {
  autoConnect: false,
});

socket.on("connect_error", (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

socket.on("error", (error) => {
  alert(error);
});

export default socket;
