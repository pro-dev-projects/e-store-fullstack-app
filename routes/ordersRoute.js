import express from "express"
import { addNewOrder, deleteOrder, getAllOrders, getSingleOrder, openStripeChekoutPage,getAllUserOrders,updateOrder } from "../controllers/ordersController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"


const router = express.Router()

// get request "/orders/" get all orders
router.get("/",auth,isAdmin, getAllOrders)

// post request "/orders/" redirecting user to stripe checkout page
router.post("/", auth,  openStripeChekoutPage)

// post request "/orders/confirm /" add new order
router.post("/confirm",auth,addNewOrder )

//get all user orders "/orders/userorders/fasfrwq4q34q34"
router.get("/userorders/:id", auth, isAdmin, getAllUserOrders)

// get request "/orders/hsfas97sa8333q3dfsfd" get single order
router.get("/:id",auth,isAdmin, getSingleOrder )

// patch request "/orders/7sdfdsf538423jh4gj234" update a order
router.patch("/:id",auth,isAdmin, updateOrder )

// delete request "/orders/7sdfdsf538423jh4gj234" delete a order
router.delete("/:id",auth,isAdmin, deleteOrder)


export default router;