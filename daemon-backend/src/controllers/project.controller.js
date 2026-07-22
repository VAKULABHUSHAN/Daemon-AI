const Project = require("../models/project.model");
const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { scanProject } = require("../services/projectScanner.service");

// Create Project
const createProject = asyncHandler(async (req, res) => {
  const { name, description, status,path } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Project name is required");
  }

  const project = await Project.create({
    name,
    description,
    status,
    path
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      project,
      "Project created successfully"
    )
  );
});

// Get All Projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({
    createdAt: -1,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        count: projects.length,
        projects,
      },
      "Projects fetched successfully"
    )
  );
});

// Get Single Project
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      "Project fetched successfully"
    )
  );
});

// Update Project
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      "Project updated successfully"
    )
  );
});

// Delete Project
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(
    req.params.id
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Project deleted successfully"
    )
  );
});
// Scan Project
const scanProjectContext = asyncHandler(async (req,res)=>{

  const project = await Project.findById(
    req.params.id
  );


  if(!project){
    throw new ApiError(
      404,
      "Project not found"
    );
  }


  if(!project.path){
    throw new ApiError(
      400,
      "Project path is missing"
    );
  }


  const context = scanProject(
    project.path
  );


  project.projectContext = context;

  await project.save();


  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      "Project scanned successfully"
    )
  );

});




module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  scanProjectContext
};