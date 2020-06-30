const { mySqlSequelize } = require("../../config/database/mysql-db");

const format = (rows) => {
  var result = [],
    index = {};

  rows.forEach(function (row) {
    if (!(row.order_id in index)) {
      index[row.order_id] = {
        order_id: row.order_id,
        status: row.status,
        user_id: row.user_id,
        payment_method: row.payment_method,
        address: row.address,
        products: [],
      };
      result.push(index[row.order_id]);
    }
    index[row.order_id].products.push({
      name: row.name,
      image_url: row.image_url,
      description: row.description,
      quantity: row.quantity,
      total_price: row.total_price,
    });
  });
  return result;
};

const getOrdersDb = async (req, res) => {
  const data = await mySqlSequelize.query(
    `SELECT O.id AS order_id ,U.id AS user_id, O.payment_method, U.address, O.status, PD.*, SUM(P.quantity) AS quantity, SUM(P.quantity * PD.price) AS total_price
    FROM products_by_order P
    JOIN orders O ON P.id_order = O.id
    JOIN products PD ON P.id_product = PD.id
    JOIN users U ON O.id_user = U.id
    WHERE U.username = "${res.decoded.username}"
    GROUP BY O.id, PD.name;`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );

  return format(data);
};

const getAllOrdersDb = async () => {
  const data = await mySqlSequelize.query(
    `SELECT O.id AS order_id ,U.id AS user_id, O.payment_method, U.address, O.status, PD.*, SUM(P.quantity) AS quantity, SUM(P.quantity * PD.price) AS total_price
    FROM products_by_order P
    JOIN orders O ON P.id_order = O.id
    JOIN products PD ON P.id_product = PD.id
    JOIN users U ON O.id_user = U.id
    GROUP BY O.id, PD.name;`,
    {
      type: mySqlSequelize.QueryTypes.SELECT,
    }
  );
  return data;
};

const createOrderDb = async (req, res) => {
  const { price, payment_method } = req.body;
  const id_user = res.decoded.user_id;
  const response = await mySqlSequelize.query(
    `INSERT INTO orders (id_user, price, payment_method)
    VALUES ("${id_user}", "${price}", "${payment_method}");`,
    {
      type: mySqlSequelize.QueryTypes.INSERT,
    }
  );

  const id_order = response[0];
  const products = req.body.products;
  products.forEach(async (element) => {
    await mySqlSequelize.query(
      ` INSERT INTO products_by_order (id_order, id_product, quantity)
      VALUES ("${id_order}", "${element.id_product}", "${element.quantity}");`,
      {
        type: mySqlSequelize.QueryTypes.INSERT,
      }
    );
  });
};

const updateOrderDb = async (req) => {
  const orderId = req.params.id;
  const { status } = req.body;
  return await mySqlSequelize.query(
    `UPDATE orders
    SET status = "${status}"
    WHERE id = "${orderId}";`,
    {
      type: mySqlSequelize.QueryTypes.UPDATE,
    }
  );
};
module.exports = { getOrdersDb, getAllOrdersDb, createOrderDb, updateOrderDb };
