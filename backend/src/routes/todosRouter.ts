import { Todos } from "../models/todos";
import express from "express";

const todosRouter = express.Router();

todosRouter.post("/todos", async (req, res) => {
  if (typeof req.body !== "object" || req.body instanceof Array) {
    res.status(400);
    res.send({ errors: ["Todos is not an object"] });
    return;
  }
  if (!("title" in req.body)) {
    res.status(400);
    res.send({ errors: ["Todos must have a title"] });
    return;
  }
  if (typeof req.body.title !== "string") {
    res.status(400);
    res.send({ errors: ["Todos title must be a string"] });
    return;
  }

  const { _id } = await Todos.create({ title: req.body.title });
  const todo = await Todos.findById(_id).lean();
  res.status(201);
  res.send({ data: { todo } });
});
todosRouter.get("/todos", async (req, res) => {
  const todos = await Todos.find().sort("-createdAt").lean();
  res.status(200);
  res.send({ data: { todos } });
});
todosRouter.get("/todo/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id).lean();
    res.status(200);
    res.send({ data: { todo } });
  } catch (err: unknown) {
    res.status(500);
    res.send({ errors: [err] });
  }
});
todosRouter.delete("/todo/:id", async (req, res) => {
  try {
    await Todos.findByIdAndRemove(req.params.id).lean();
    res.status(200);
    res.send({});
  } catch (err: unknown) {
    res.status(500);
    res.send({ errors: [err] });
  }
});

todosRouter.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.params.id, {
      title: "updated todo",
    }).lean();
    res.status(200);
    res.send({ data: { todo } });
  } catch (err: unknown) {
    res.status(500);
    res.send({ errors: [err] });
  }
});
export { todosRouter };
