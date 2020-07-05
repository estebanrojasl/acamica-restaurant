const { MysqlConfig } = require("../config/environments/development").config;
const { Sequelize } = require("sequelize");

const mySqlSequelize = new Sequelize(
  "",
  MysqlConfig.User,
  MysqlConfig.Password,
  {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
    dialectOptions: {
      multipleStatements: true,
    },
    operatorsAliases: 0,
  }
);

const checkDb = async () => {
  try {
    return await mySqlSequelize.query(
      `SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
     WHERE SCHEMA_NAME = '${MysqlConfig.Db}';`,
      {
        type: mySqlSequelize.QueryTypes.SELECT,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const setDb = async () => {
  try {
    return await mySqlSequelize.query(
      `CREATE SCHEMA larissa_restaurant; 
      USE larissa_restaurant;`,
      {
        type: mySqlSequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createUserTable = async () => {
  try {
    return (
      await mySqlSequelize.query(
        `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        admin BOOL DEFAULT false,
        name VARCHAR(60) NOT NULL,
        username VARCHAR(60) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL UNIQUE,
        phone VARCHAR(60) NOT NULL,
        address VARCHAR(60) NOT NULL,
        active BOOL DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`
      ),
      {
        type: mySqlSequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const createProductTable = async () => {
  try {
    return await mySqlSequelize.query(
      `CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL UNIQUE,
        image_url  VARCHAR(60) NOT NULL NOT NULL,
        description  VARCHAR(100) NOT NULL NOT NULL,
        price INT NOT NULL,
        active BOOL DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`,
      {
        type: mySqlSequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const createOrderTable = async () => {
  try {
    return await mySqlSequelize.query(
      `CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        price INT NOT NULL,
        payment_method ENUM('cash', 'card') NOT NULL,
        status ENUM('new', 'confirmed', 'preparing', 'out', 'delivered', 'cancelled') DEFAULT 'new' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`,
      {
        type: mySqlSequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const createProductsByOrderTable = async () => {
  try {
    return await mySqlSequelize.query(
      `CREATE TABLE IF NOT EXISTS products_by_order (
        id_order INT NOT NULL,
        id_product INT NOT NULL,
        quantity INT DEFAULT 1
      );`,
      {
        type: mySqlSequelize.QueryTypes.RAW,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addForeignKeys = async () => {
  try {
    return await mySqlSequelize.query(
      `ALTER TABLE orders
      ADD CONSTRAINT FK_ORDER_USER
      FOREIGN KEY (id_user) REFERENCES users(id);
      
      ALTER TABLE products_by_order
      ADD CONSTRAINT FK_PRODUCTBY_ORDER
      FOREIGN KEY (id_order) REFERENCES orders(id);
      
      ALTER TABLE products_by_order
      ADD CONSTRAINT FK_PRODUCTBY_PRODUCT
      FOREIGN KEY (id_product) REFERENCES products(id);`,
      {
        type: mySqlSequelize.QueryTypes.FOREIGNKEYS,
      }
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

const populateDb = async (req, res, next) => {
  try {
    await mySqlSequelize.query(
      `INSERT IGNORE INTO users (name, admin, username, password, email, phone, address)
      VALUES ('Esteban Rojas', 1, 'erojasl', 'eafiT2020*', 'esteban7590@hotmail.com', '3201230', 'cra 43d 23s');
      
      INSERT IGNORE INTO products (name, image_url, description, price)
      VALUES 
      ('perro', 'http://ayayay.co', 'perro cliente', '1000'),
      ('burger', 'http://yass.co', 'burger', '3000');

      INSERT INTO orders (id_user, price, payment_method, status)
      VALUES (1, 2000, 'cash', 'new');

      INSERT INTO products_by_order (id_order, id_product, quantity)
      VALUES (1, 1, 1),
      (1, 2, 2);`,
      {
        type: mySqlSequelize.QueryTypes.INSERT,
      }
    );
    return console.log("Database and tables created and populated");
  } catch (err) {
    console.log(err);
  }
};

(async function () {
  try {
    let check = await checkDb();
    if (check && check.length > 0) {
      console.log("Database already exists");
      return;
    }
    await setDb();
    await createUserTable();
    await createProductTable();
    await createOrderTable();
    await createProductsByOrderTable();
    await addForeignKeys();
    await populateDb();
  } catch (err) {
    return err;
  }
})();
