import connection from "../../../DB/connection/connection.js"
import productSchema from "../../middleware/productValidation.js";


//~ Getting all products from database. 
export const getAllprojects = (req, res, next) => {
  connection.execute('select * from product', (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.status(200).json({ message: "Done", Products: result });
  })
}


//~ Adding a product.
export const addProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { productName, price, description, category } = req.body;

  const query = 'INSERT INTO product (productName, price, description, category) VALUES (?, ?, ?, ?)';

  connection.execute(query, [productName, price, description, category], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Error adding new product' });
    }
    return res.status(201).json({ message: 'Product added successfully!' });
  });
};


//~ Updating product using the id of the product.
export const updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const { productName, price, description, category } = req.body;

  const { error } = productSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const query = 'UPDATE product SET productName = ?, price = ?, description = ?, category = ? WHERE id = ?';

  connection.execute(query, [productName, price, description, category, productId], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product updated successfully' });
  });
};


//~ Deleting product using the id of the product.
export const deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  const query = 'DELETE FROM product WHERE id = ?';

  connection.execute(query, [productId], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  });
};



//~ Search for products by name
export const searchProducts = (req, res, next) => {
  const { searchQuery } = req.params;
  // console.log('Received search query:', req.params);
  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const query = 'SELECT * FROM product WHERE productName LIKE ? ORDER BY CASE WHEN productName LIKE ? THEN 0 ELSE 1 END, productName';
  const searchTermStartsWith = searchQuery + '%';
  const searchTermContains = '%' + searchQuery + '%';

  connection.execute(query, [searchTermContains, searchTermStartsWith], (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No products found!' });
    }
    return res.status(200).json({ message: 'Products found', products: results });
  });
};
