const express=require("express")
const router=express.Router()

const recruiterController=require("../Controller/RecruiterController")

router.post("/",recruiterController.createrecruiter)
router.get("/",recruiterController.listAllrecruiters)
router.get("/:recruiterId",recruiterController.listrecruiterbyId)
router.delete("/:recruiterId",recruiterController.deleterecruiterById)
module.exports=router