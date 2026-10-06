const usersDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const { access } = require("fs");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  const foundUser = usersDB.users.find((person) => {
    return person.username === user;
  });

  if (!foundUser) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles)
    //jwt
    const accessToken = jwt.sign(
      { 
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles,
        }
       },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" },
    );

    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    //saving the jwt to the db (along with the current user)
    const otherUsers = usersDB.users.filter((person) => {
      person.username !== foundUser.username;
    });
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUser([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users),
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
