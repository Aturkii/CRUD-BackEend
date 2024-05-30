import connection from "../../DB/connection/connection.js";


const productNameExists = (req, res, next) => {
  const { productName } = req.body;
  const checkQuery = 'SELECT productName FROM product WHERE productName = ?';
  connection.execute(checkQuery, [productName], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.length) {
      return res.status(409).json({ message: 'Product name already exists' });
    }
    next();
  });
}

export default productNameExists;