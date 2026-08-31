const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3500;

const Server = http.createServer(function (req, res) {
    console.log(req.url, req.method)

    let extension = path.extname(req.url)
    console.log(extension)
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(
    path.join(__dirname, "views", "index.html"), 'utf8',
    function (err, data) {
      if (err) {
        res.writeHead(404);
        res.write("Error, file not found");
      } else {
        res.write(data);
      }
      res.end();
    },
  );
});

Server.listen(PORT, function (error) {
  if (error) {
    console.log("something went wrong: ", error);
  } else {
    console.log("server listening on port: ", PORT);
  }
});
