const axios = require("axios");

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://127.0.0.1:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || "deepseek-r1:8b";

const generateResponse = async (prompt) => {
  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      }
    );

    return response.data.response;
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