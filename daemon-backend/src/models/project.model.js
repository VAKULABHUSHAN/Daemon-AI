const mongoose = require("mongoose");
const { PROJECT_STATUS } = require("../utils/constants");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
  type: String,
  enum: Object.values(PROJECT_STATUS),
  default: PROJECT_STATUS.ACTIVE,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);