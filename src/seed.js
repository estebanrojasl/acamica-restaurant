const { mySqlSequelize } = require("../config/database/mysql-db");
const { userModel } = require("./models/user-model");

const setDb = async () => {
  try {
    await mySqlSequelize.query(
      `DROP DATABASE IF EXISTS larissa_restaurant; 
      CREATE DATABASE larissa_restaurant; 
      USE larissa_restaurant;`
    );
  } catch (err) {
    console.log(err);
  }
};

const createUserTable = async () => {
  await userModel();
};

const populateDb = async (req, res, next) => {
  return await mySqlSequelize.query(
    `INSERT INTO users (name, admin, username, password, email, phone, address)
    VALUES ('juan', 1, 'juan12da', '5646*', '1@.com', '3201230', 'cra 43d 23s'),
    ('daniel', 0, 'dan34de', '12345', '2@.com', '5412545', 'cl 23d 43');`
  );
};

const listQuery = async (req, res, next) => {
  return await mySqlSequelize.query(`SELECT * FROM users`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

const print = async () => {
  await setDb();
  await createUserTable();
  await populateDb();
  setTimeout(async () => {
    console.log(await listQuery());
  }, 1000);
};

print();
