const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const { generateResponse } = require("../services/ollama.service");

const chat = asyncHandler(async (req, res) => {
  const { conversationId, project, message } = req.body;

  if (!message || !message.trim()) {
    throw new ApiError(400, "Message is required.");
  }

  let conversation;

  // Create a new conversation if one doesn't exist
  if (!conversationId) {
    conversation = await Conversation.create({
      title: message.substring(0, 50),
      project: project || null,
    });
  } else {
    conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      throw new ApiError(404, "Conversation not found.");
    }
  }

  // Save user message
  await Message.create({
    conversation: conversation._id,
    role: "user",
    content: message,
  });

  // Load conversation history
  const previousMessages = await Message.find({
    conversation: conversation._id,
  }).sort({
    createdAt: 1,
  });

  // Convert messages to Ollama chat format
  const ollamaMessages = previousMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Generate AI response
  const response = await generateResponse(ollamaMessages);

  // Save AI response
  await Message.create({
    conversation: conversation._id,
    role: "assistant",
    content: response,
  });

  // Update conversation timestamp
  await Conversation.findByIdAndUpdate(
    conversation._id,
    {
      updatedAt: new Date(),
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        conversationId: conversation._id,
        response,
      },
      "Response generated successfully."
    )
  );
});

module.exports = {
  chat,
};