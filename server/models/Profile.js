import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  aboutDescription: {
    type: String,
    default: "",
  },
  githubUrl: {
    type: String,
    default: "",
  },
  cvUrl: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

export default mongoose.model("Profile", profileSchema);

