const express = require("express");
const router = express.Router();
const applicationController = require("../Controller/ApplicationController");


router.post("/:jobId", applicationController.applyJob);


router.get("/", applicationController.getApplicantsForJob);

module.exports = router;
