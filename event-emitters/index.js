const logEvent = require("./logEvent");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("logs", (msg) => {
  logEvent(msg);
});

setTimeout(() => {
  myEmitter.emit("logs", "event log!!!");
}, 2000);
