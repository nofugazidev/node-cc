const eventLog = require("./eventLog");
const EventEmitter = require("events");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("logs", (message, fileName) => {
  eventLog(message, fileName);
});

//create the port
const PORT = process.env.PORT || 3500;

//create a serve file function
async function serveFile(filePath, contentType, response) {
  try {
    //read the requested file
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : "",
    );

    //convert json to javascript object
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;

    //send the http status code and content type
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });

    //sent the actual content back
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data,
    );
  } catch (error) {
    console.log(error);
    myEmitter.emit("logs", `${error.name}: ${error.message}`, "log-events.txt");

    response.statusCode = 500;
    response.end();
  }
}

//create a server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //log the request
  myEmitter.emit("logs", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
        ? path.join(__dirname, "views", "index.html")
        : contentType === "text/html"
          ? path.join(__dirname, "views", req.url)
          : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  let fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, {
          Location: "/index.html",
        });
        res.end();
        break;
      case "www-page.html":
        (res.writeHead(301, {
          Location: "/index.html",
        }),
          res.end());
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

//start the server
server.listen(PORT, () => {
  //
  console.log(`server is running on port: ${PORT}`);
});
