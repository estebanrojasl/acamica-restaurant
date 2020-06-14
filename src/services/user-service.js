const { mySqlSequelize } = require("../../config/database/mysql-db");

const getBandasDb = async () => {
  //   await setDb();
  return await mySqlSequelize.query(`SELECT * FROM banda`, {
    type: mySqlSequelize.QueryTypes.SELECT,
  });
};

module.exports = { getBandasDb };
