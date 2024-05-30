import { Router } from "express";
import * as PC from './product.controller.js'
import productNameExists from "../../middleware/productNameExist.js";


const router = Router()


router.get('/products', PC.getAllprojects)
router.get('/products/search/:searchQuery', PC.searchProducts)
router.post('/addProduct', productNameExists,PC.addProduct)
router.put('/updateProduct/:id',productNameExists,PC.updateProduct)
router.delete('/deleteProduct/:id',PC.deleteProduct)

export default router;