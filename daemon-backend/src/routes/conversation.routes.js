const express = require("express");

const {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
} = require("../controllers/conversation.controller");

const router = express.Router();

router.post("/", createConversation);

router.get("/", getConversations);

router.get("/:id", getConversationById);

router.delete("/:id", deleteConversation);

module.exports = router;