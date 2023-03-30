import express from "express"
import { addNewProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productsController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"

const router = express.Router()

// get request "/products/" get all products
router.get("/", getAllProducts )

// post request "/products/" add new product
router.post("/",auth, isAdmin,  addNewProduct )

// get request "/products/hsfas97sa8333q3dfsfd" get single product
router.get("/:id", getSingleProduct )

// patch request "/products/7sdfdsf538423jh4gj234" update a product
router.patch("/:id",auth, isAdmin, updateProduct )

// delete request "/products/7sdfdsf538423jh4gj234" delete a product
router.delete("/:id", auth, isAdmin, deleteProduct)


export default router;