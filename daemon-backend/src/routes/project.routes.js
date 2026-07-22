const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
   scanProjectContext
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

// AI Project Scanner
router.post(
  "/scan/:id",
  scanProjectContext
);
router.post(
 "/:id/scan",
 scanProjectContext
);
module.exports = router;