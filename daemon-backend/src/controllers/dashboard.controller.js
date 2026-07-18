const Project = require("../models/project.model");

const getDashboardStats = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        projects: projectCount,
        knowledge: 0,
        conversations: 0,
        models: 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getDashboardActivity = async (req, res) => {
  try {
    const activity = [
      {
        id: 1,
        type: "PROJECT_CREATED",
        title: "Created Project",
        description: "Created Daemon workspace",
        time: "2 mins ago",
      },
      {
        id: 2,
        type: "KNOWLEDGE_IMPORTED",
        title: "Imported Knowledge",
        description: "Added architecture.md",
        time: "Yesterday",
      },
      {
        id: 3,
        type: "CHAT_STARTED",
        title: "Started AI Chat",
        description: "Opened local assistant",
        time: "2 days ago",
      },
    ];

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getDashboardStatus = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        api: {
          status: "ONLINE",
          message: "API Server Running",
        },
        mongodb: {
          status: "ONLINE",
          message: "Connected",
        },
        electron: {
          status: "ONLINE",
          message: "Desktop Runtime",
        },
        ollama: {
          status: "OFFLINE",
          message: "Not Connected",
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDashboardStats,
  getDashboardActivity,
  getDashboardStatus,
};