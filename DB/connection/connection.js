import mysql from "mysql2";

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'products'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database Successfully.');
});


export default connection;