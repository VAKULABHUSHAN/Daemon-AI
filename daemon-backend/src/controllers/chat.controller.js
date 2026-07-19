const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const { generateResponse } = require("../services/ollama.service");

const chat = asyncHandler(async (req, res) => {

    const { message } = req.body;

    if (!message || !message.trim()) {
        throw new ApiError(400, "Message is required.");
    }

    const response = await generateResponse(message);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                response
            },
            "Response generated successfully."
        )
    );

});

module.exports = {
    chat
};