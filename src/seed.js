const { mySqlSequelize } = require("../config/database/mysql-db");

const setDb = async (req, res, next) => {
  return await mySqlSequelize.query(
    [
      `DROP DATABASE larissa_restaurant;`,
      `CREATE DATABASE larissa_restaurant;`,
      `USE larissa_restaurant;`,
      `CREATE TABLE Banda (
	    id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        integrantes INT NOT NULL,
        fecha_inicio VARCHAR(64) NOT NULL,
        fecha_separacion VARCHAR(64) NULL,
        pais VARCHAR(60) NOT NULL);`,
      `INSERT INTO Banda (nombre, integrantes, fecha_inicio, fecha_separacion, pais)
        VALUES ('santi', 1, '02-02-2020', '02-02-2020', 'colombia');`,
    ].join(" ")
  );
};

const listQuery = async (req, res, next) => {
  return await mySqlSequelize.query(`SELECT * FROM banda`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

const print = async () => {
  await setDb();
  console.log(await listQuery());
};

print();
