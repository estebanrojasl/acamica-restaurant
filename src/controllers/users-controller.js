const userService = require("../services/user-service");

const getBandas = async (req, res) => {
  try {
    const userInfo = await userService.getBandasDb();
    return res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getBandas };
