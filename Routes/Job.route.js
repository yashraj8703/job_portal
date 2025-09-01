const express=require("express")
const router=express.Router()

const jobController=require("../Controller/JobController")

router.post("/",jobController.createjob)
router.get("/",jobController.listAlljobs)
router.get("/:userId",jobController.listjobbyId)
router.delete("/:userId",jobController.deletejobById)
module.exports=router