import { Router } from "express";
import * as jobController from "../controllers/job.controller";
import validate from "../middlewares/validate";
import {
  createJobSchema,
  updateJobSchema,
  jobIdSchema,
  listJobsSchema,
} from "../validators/job.validator";

const router = Router();

router.post(
  "/",
  validate(createJobSchema),
  jobController.createJob
);

router.get(
  "/",
  validate(listJobsSchema),
  jobController.getJobs
);

router.get(
  "/:id",
  validate(jobIdSchema),
  jobController.getJobById
);

router.put(
  "/:id",
  validate(updateJobSchema),
  jobController.updateJob
);

router.delete(
  "/:id",
  validate(jobIdSchema),
  jobController.deleteJob
);

export default router;