const express=require("express")
const router=express.Router()

const jobController=require("../Controller/JobController")
const recruiterAuth=require("../middleware/recruiterAuth")


router.post("/",recruiterAuth,jobController.createjob)
router.get("/",jobController.listAlljobs)
router.get("/:jobId",jobController.listjobbyId)
router.delete("/:jobId",recruiterAuth,jobController.deletejobById)
module.exports=router