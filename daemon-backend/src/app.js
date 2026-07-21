const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const projectRoutes = require("./routes/project.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const chatRoutes = require("./routes/chat.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");


const errorHandler = require("./middleware/errorHandler");


const app = express();


app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/projects", projectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/workspace", workspaceRoutes);
app.use("/chat", chatRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);


// Error handler
app.use(errorHandler);


module.exports = app;