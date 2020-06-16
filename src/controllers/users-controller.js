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

module.exports = { getUsers };
