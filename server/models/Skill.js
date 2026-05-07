import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
    enum: ["frontend", "backend", "tools", "other", "frameworks", "libraries", "programming languages", "databases"],
  },
}, {
  timestamps: true,
});

export default mongoose.model("Skill", skillSchema);

