const userService = require("../services/user-service");

const getUsers = (req, res) => {
  return userService
    .getUsers()
    .then((userInfo) => res.status(200).json(userInfo))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const createUser = (req, res) => {
  return res.status(200).json("Create Users");
};

const updateUser = (req, res) => {
  return res.status(200).json("Update Users");
};

module.exports = { getUsers, createUser, updateUser };
