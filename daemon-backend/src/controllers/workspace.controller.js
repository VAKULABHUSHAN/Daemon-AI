const Workspace = require("../models/workspace.model");
const Project = require("../models/project.model");

// Get current workspace
const getWorkspace = async (req, res) => {
  try {
    let workspace = await Workspace.findOne().populate("activeProject");

    // Create one if it doesn't exist
    if (!workspace) {
      workspace = await Workspace.create({
        activeProject: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: workspace,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Open a project
const openWorkspace = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    let workspace = await Workspace.findOne();

    if (!workspace) {
      workspace = await Workspace.create({
        activeProject: project._id,
      });
    } else {
      workspace.activeProject = project._id;
      workspace.lastOpened = new Date();
      await workspace.save();
    }

    await workspace.populate("activeProject");

    return res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWorkspace,
  openWorkspace,
};