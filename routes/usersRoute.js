import express from "express"

import { addNewUser, deleteUser, getAllUsers, getSingleUser, loginUser, updateUser } from "../controllers/usersController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import { rules } from "../middlewares/validators.js"


const router = express.Router()

// get request "/users/" get all users
router.get("/", auth,isAdmin,  getAllUsers)

// post request "/users/" add new user  //register
router.post("/",rules, addNewUser )


// /login post request "/users/login" user authentication
router.post("/login", loginUser )

// verifyTonken on page refresh
// get "/users/refreshpage"
router.get("/refreshpage", auth, (req,res)=>{
    res.json({success:true, data:req.user})
})

// get request "/users/hsfas97sa8333q3dfsfd" get single user
router.get("/:id",auth, isAdmin, getSingleUser )


// patch request "/users/7sdfdsf538423jh4gj234" update a user
router.patch("/:id",auth, isAdmin, updateUser )

// delete request "/users/7sdfdsf538423jh4gj234" delete a user
router.delete("/:id",auth,  isAdmin, deleteUser)



export default router;