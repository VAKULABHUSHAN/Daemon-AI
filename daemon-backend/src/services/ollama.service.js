const axios = require("axios");

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://127.0.0.1:11434";

const OLLAMA_MODEL =
process.env.OLLAMA_MODEL;
  //process.env.OLLAMA_MODEL || "deepseek-r1:8b";

const generateResponse = async (messages) => {
  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/chat`,
      {
        model: OLLAMA_MODEL,
        messages,
        stream: false,
      }
    );

    return response.data.message.content;
  } catch (error) {
    console.error("========== OLLAMA ERROR ==========");
    console.error(error.response?.data || error.message);
    console.error("=================================");

    throw new Error("Unable to communicate with Ollama.");
  }
};

module.exports = {
  generateResponse,
};