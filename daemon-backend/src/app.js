const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const projectRoutes = require("./routes/project.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

app.use("/projects", projectRoutes);


app.get("/", (req, res) => {
  res.json({
    app: "Daemon Backend",
    version: "1.0.0",
    status: "Running 🚀"
  });
});
app.use(errorHandler);
module.exports = app;