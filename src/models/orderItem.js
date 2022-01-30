const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, cb) {
    var sql = ` INSERT INTO OrderItems
                (OrderID, ProductID, Quantity, CreatedAt, UpdatedAt)
                VALUES (? , ? , ? , now(), now())`;
    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function editOrderItem(data, cb) {
    var sql = ` UPDATE OrderItems SET 
                Quantity = ? , UpdatedAt = now() WHERE
                OrderId = ? AND ProductID = ?`;

    var values = [];
    values.push(data.quanitity);
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function deleteOrderItem(data, cb) {
    var sql = ` DELETE FROM OrderItems WHERE
                OrderId = ? AND ProductID = ?`;

    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getOrderItems(data, cb) {
    var sql = ` SELECT * FROM OrderItems WHERE
                OrderId = ? AND ProductID = ?`;

    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getProductQuantityInCart(data) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT oi.Quantity as quantity
                from OrderDetails od join OrderItems oi on od.ID = oi.OrderID
                join Products p on p.ID = oi.ProductID 
                join Users u on u.ID = od.UserID
                where u.ID = ? and od.ID = ?;
      `;
  
      let values = [];
      values.push(data.userId);
      values.push(data.orderId);
      sqlConnection.executeQuery(sql, values, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].quantity);
        }
      });
    });
  }

module.exports = {addOrderItem, getOrderItems, editOrderItem, deleteOrderItem, getProductQuantityInCart};