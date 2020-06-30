const userService = require("../services/user-service");
const ENV = process.env.NODE_ENV || "development";
const { JwtTokenExpires } = require("../../config/environments/" + ENV).config;

const getUsers = async (req, res) => {
  try {
    const userInfo = await userService.getUsersDb();
    return res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    await userService.createUserDb(req);
    return res.status(201).json({ message: "created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const logUser = async (req, res) => {
  try {
    const token = await userService.logUserDb(req);
    return res.status(200).json({
      token: token,
      token_type: "bearer",
      expires_in: JwtTokenExpires,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
};

module.exports = { getUsers, createUser, logUser };
