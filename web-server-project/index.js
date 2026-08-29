const eventLog = require("./eventLog");
const EventEmitter = require("events");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("logs", (msg)=>{
    eventLog(msg)
})

myEmitter.emit("logs", "log event")




