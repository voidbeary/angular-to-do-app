import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
});
const Todos = mongoose.model("todo", todoSchema);

export { Todos };
