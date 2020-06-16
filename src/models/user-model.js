const { mySqlSequelize } = require("../../config/database/mysql-db");

const userModel = async () => {
  return await mySqlSequelize.query(
    `CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      admin BOOL DEFAULT false,
      name VARCHAR(60) NOT NULL,
      username VARCHAR(60) NOT NULL UNIQUE,
	    password VARCHAR(60) NOT NULL UNIQUE,
      email VARCHAR(60) NOT NULL,
      phone VARCHAR(60) NOT NULL,
	    address VARCHAR(60) NOT NULL,
	    active BOOL DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`
  );
};

module.exports = {
  userModel,
};
