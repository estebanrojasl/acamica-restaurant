const ENV = process.env.NODE_ENV || "development";
const { mySqlSequelize } = require("../../config/database/mysql-db");
const jwt = require("jsonwebtoken");
const { config } = require("../../config/environments/" + ENV);

const createUserDb = async (req) => {
  const { name, username, password, email, phone, address } = req.body;
  return await mySqlSequelize.query(
    `INSERT INTO users (name, username, password, email, phone, address)
      VALUES ("${name}", "${username}", "${password}", "${email}", "${phone}", "${address}");`,
    {
      type: mySqlSequelize.QueryTypes.INSERT,
    }
  );
};

const logUserDb = async (req, res) => {
  const { username, password } = req.body;
  const userData = await mySqlSequelize.query(
    `SELECT username, admin, password, id
    FROM users
    WHERE username = "${username}" OR email = "${username}" AND password = "${password}";`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );
  if (userData.length !== 1) {
    throw {
      message: "Incorrect username or password",
      error: new Error(),
    };
  } else {
    const payload = {};
    payload.user_id = userData[0].id;
    payload.username = userData[0].username;
    payload.admin = userData[0].admin;
    const tokenServer = jwt.sign(payload, config.JwtSecretKey, {
      expiresIn: config.JwtTokenExpires,
    });
    return tokenServer;
  }
};

module.exports = { createUserDb, logUserDb };
