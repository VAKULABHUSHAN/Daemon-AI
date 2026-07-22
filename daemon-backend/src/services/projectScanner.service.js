const fs = require("fs");
const path = require("path");


const IGNORE_FOLDERS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".angular",
  ".dart_tool",
  ".idea",
  ".vscode",

  // Flutter generated folders
  ".gradle",
  ".kotlin",
  "ephemeral",
  ".plugin_symlinks",
  ".pub-cache"
];


const IGNORE_FILES = [
  ".DS_Store",
  "local.properties",
  ".packages",
  ".flutter-plugins",
  ".flutter-plugins-dependencies"
];


const MAX_DEPTH = 6;



const scanDirectory = (
  directory,
  root = directory,
  depth = 0
) => {


  // Prevent scanning huge nested folders
  if (depth > MAX_DEPTH) {
    return {
      structure: [],
      files: []
    };
  }


  let structure = [];
  let files = [];


  const items = fs.readdirSync(directory);


  items.forEach((item) => {


    // Ignore folders
    if (IGNORE_FOLDERS.includes(item)) {
      return;
    }


    // Ignore files
    if (IGNORE_FILES.includes(item)) {
      return;
    }


    const fullPath = path.join(
      directory,
      item
    );


    const relativePath = path.relative(
      root,
      fullPath
    );


    const stats = fs.statSync(fullPath);



    if (stats.isDirectory()) {


      structure.push(relativePath);


      const result = scanDirectory(
        fullPath,
        root,
        depth + 1
      );


      structure = [
        ...structure,
        ...result.structure
      ];


      files = [
        ...files,
        ...result.files
      ];


    } else {


      files.push({
        name: item,
        path: relativePath,
        extension: path.extname(item),
        size: stats.size
      });


    }


  });



  return {
    structure,
    files
  };

};





const scanProject = (projectPath) => {


  if (!fs.existsSync(projectPath)) {

    throw new Error(
      "Project path does not exist"
    );

  }



  const result = scanDirectory(
    projectPath
  );



  return {

    structure: result.structure,

    files: result.files,

    summary:
      `Project contains ${result.files.length} files`,

    scannedAt: new Date()

  };

};




module.exports = {
  scanProject
};