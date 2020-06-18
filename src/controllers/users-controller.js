const userService = require("../services/user-service");

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
    return res.status(204).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const logUser = async (req, res) => {
  try {
    const token = await userService.logUserDb(req);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
};

module.exports = { getUsers, createUser, logUser };
