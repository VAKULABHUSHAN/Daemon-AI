const express = require("express");

const router = express.Router();

const {
  getWorkspace,
  openWorkspace,
} = require("../controllers/workspace.controller");

router.get("/", getWorkspace);

router.put("/open/:projectId", openWorkspace);

module.exports = router;