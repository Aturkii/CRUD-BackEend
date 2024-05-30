import express from "express";
import cors from "cors";
import connection from "./DB/connection/connection.js";
import productRouter from "./src/modules/product/product.routes.js"
import errorHandler from "./src/middleware/errorHandler.js";
const app = express()


app.use(express.json())
app.use(cors())


app.use("/api",productRouter)

app.get("*", (req, res, next) => {
  res.status(404).json("404 Page Not Found!")
})
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
