const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getDashboardActivity,
  getDashboardStatus,
} = require("../controllers/dashboard.controller");


router.get("/stats", getDashboardStats);

router.get("/activity", getDashboardActivity);

router.get("/status", getDashboardStatus);


module.exports = router;