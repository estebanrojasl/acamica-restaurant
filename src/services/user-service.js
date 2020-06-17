const { mySqlSequelize } = require("../../config/database/mysql-db");

const getUsersDb = async () => {
  return await mySqlSequelize.query(`SELECT * FROM users`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

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

module.exports = { getUsersDb, createUserDb };
