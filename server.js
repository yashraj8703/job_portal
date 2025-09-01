const express = require("express");
const app = express();
const connectDB = require("./db/database");
const userRouter = require("./Routes/User.route");
const recruiterRouter = require("./Routes/Recruiter.route");
const jobRouter = require("./Routes/Job.route");
const applicationController = require("./Routes/Application.route");
connectDB();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/recruiter", recruiterRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationController);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
