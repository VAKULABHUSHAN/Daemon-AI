const Conversation = require("../models/conversation.model");
const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Message = require("../models/message.model");

// Create Conversation
const createConversation = asyncHandler(async (req, res) => {
  const { title, project } = req.body;

  const conversation = await Conversation.create({
    title: title || "New Chat",
    project: project || null,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      conversation,
      "Conversation created successfully"
    )
  );
});

// Get All Conversations
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find()
    .populate("project", "name")
    .sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        count: conversations.length,
        conversations,
      },
      "Conversations fetched successfully"
    )
  );
});

// Get Conversation
const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id)
    .populate("project", "name");

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      conversation,
      "Conversation fetched successfully"
    )
  );
});


// Delete Conversation
const deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findByIdAndDelete(req.params.id);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  await Message.deleteMany({
    conversation: req.params.id,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Conversation deleted successfully"
    )
  );
});

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
};