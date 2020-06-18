const config = {
  Port: 3000,
  JwtSecretKey:
    "856ED746F97360B36E4BA820EB5A848206D5B40EA5D2D5BE0A5392E8BBD2A16C",
  JwtTokenExpires: 600,
  MysqlConfig: {
    Db: "larissa_restaurant",
    User: "root",
    Password: "eafiT2020*",
    Host: "localhost",
    Dialect: "mysql",
    // logging: true,
  },
};

module.exports = { config };
