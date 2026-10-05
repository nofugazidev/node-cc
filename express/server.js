const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const {verifyJWT} = require('./middleware/verifyJWT')
const cors = require("cors");
const cookieParser = require('cookie-parser')
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
      callback(new Error("Request Blocked by CORS!!!"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//for urlencoded data
app.use(express.urlencoded({ extended: false }));
//for json files
app.use(express.json());

//middleware for cookies
app.use(cookieParser())
//built-in middleware for static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use('/register', require('./routes/apis/register'))
app.use('/login', require('./routes/apis/login'))
app.use('/refresh', require('./routes/apis/refresh'))
app.use('/logout', require('./routes/apis/logout'))

app.use(verifyJWT);
app.use('/employee', require('./routes/apis/employees'))


// app.all("/*catchall", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

//this{below} will work as the above
app.get("/*catchall", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
