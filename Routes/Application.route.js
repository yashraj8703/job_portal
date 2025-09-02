const express = require("express");
const router = express.Router();
const applicationController = require("../Controller/ApplicationController");
const userAuth=require("../middleware/userAuth")


router.post("/:jobId", userAuth,applicationController.applyJob);


router.get("/", applicationController.getApplicantsForJob);

module.exports = router;
