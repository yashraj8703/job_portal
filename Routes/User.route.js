const express=require("express")
const router=express.Router()

const userController=require("../Controller/UserController")

router.post("/",userController.createUser)
router.get("/",userController.listAllUsers)
router.get("/:userId",userController.listUserbyId)
router.delete("/:userId",userController.deleteUserById)
module.exports=router