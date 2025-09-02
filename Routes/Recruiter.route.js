const express=require("express")
const router=express.Router()

const recruiterController=require("../Controller/RecruiterController")

router.post("/",recruiterController.createrecruiter)
router.post("/signin",recruiterController.signin)
router.get("/",recruiterController.listAllrecruiters)
router.get("/:recruiterId",recruiterController.listrecruiterbyId)
router.delete("/:recruiterId",recruiterController.deleterecruiterById)
module.exports=router