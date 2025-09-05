const express = require("express");
const router = express.Router();
const applicationController = require("../Controller/ApplicationController");
const userAuth=require("../middleware/userAuth");
const recruiterAuth = require("../middleware/recruiterAuth");


router.post("/user-job-apply/:jobId", userAuth,applicationController.applyJob);
router.get("/user-applied-jobs", userAuth,applicationController.getUserAppliedJobs);
router.get("/recruiter-job-application",recruiterAuth, applicationController.getApplicantsForRecruiterJobs);
router.get("/recruiter/:jobId",recruiterAuth,applicationController.getApplicantsForSpecificJob)
module.exports = router;
