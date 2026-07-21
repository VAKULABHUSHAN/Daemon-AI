const express = require("express");

const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/message.controller");

const router = express.Router();

router.post("/", createMessage);

router.get("/:conversationId", getMessages);

router.delete("/:id", deleteMessage);

module.exports = router;