const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = [
  "https://www.google.com",
  "http://127.0.0.1:5500/",
  "http://localhost:3500/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Request Blocked by CORS!!!"))
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//for urlencoded data
app.use(express.urlencoded({ extended: false }));
//for json files
app.use(express.json());
//built-in middleware for static files
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/js")));

app.get(["/", "/index{.html}"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(["/about", "/about{.html}"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get(["/contact", "/contact{.html}"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get(["/old-page", "/old-page{.html}"], (req, res) => {
  res.redirect(301, "/index.html");
});

app.get("/*catchall", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
