const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");



// this function  makes sure the port number is valid
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};



// this function handles ERRORS
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// this function handles LISTENING
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// set the port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// create and run the server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




/*
  HERE ARE DIFFERENT WAYS OF DOING THE SAME THINGS
  ************************************************
  ******************************************************************************************
  This also creates a server , res.end simply tells we finished the response
 * const server = http.createServer((req,res) => {                                         *
 *  // end just states we finished writing to the response and we pass what we want to send*
 *  res.end('This is My First Response');                                                  *
 * });                                                                                     *
 *******************************************************************************************
 */
