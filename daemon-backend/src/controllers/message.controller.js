const Message = require("../models/message.model");
const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// Save Message
const createMessage = asyncHandler(async (req, res) => {
  const { conversation, role, content } = req.body;

  if (!conversation) {
    throw new ApiError(400, "Conversation ID is required");
  }

  if (!role) {
    throw new ApiError(400, "Role is required");
  }

  if (!content || !content.trim()) {
    throw new ApiError(400, "Message content is required");
  }

  const message = await Message.create({
    conversation,
    role,
    content,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      message,
      "Message saved successfully"
    )
  );
});

// Get Messages by Conversation
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.conversationId,
  }).sort({
    createdAt: 1,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        count: messages.length,
        messages,
      },
      "Messages fetched successfully"
    )
  );
});

// Delete Message
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Message deleted successfully"
    )
  );
});

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};