import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },  // Date + Time
  email: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
