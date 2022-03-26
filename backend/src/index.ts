import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { todosRouter } from "./routes/todosRouter";

const app = express();
const port = 3001;
const todos = [
  { id: 1, title: "Hello!" },
  { id: 2, title: "BOB!" },
];
const DB_URL = process.env.DB_URL;

main();
async function main() {
  try {
    if (!DB_URL) {
      console.log("DB_URL undefined, provide it in .env file");
      return;
    }
    await mongoose.connect(DB_URL);
    console.log("Successfully connected to database");
  } catch (err) {
    console.log(err);
  }
}

app.use(express.json());
app.use("/api", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/api/todos", function (req, res) {
//   res.send({
//     data: todos,
//   });
// });
// app.post("/api/todos", function (req, res) {
//   let newTodo = {
//     id: 3,
//     title: req.body.title,
//   };
//   todos.push(newTodo);

//   res.status(201);
//   res.send({ data: todos[todos.length - 1] });
// });

// app.get("/api/todo/:id", function (req, res) {
//   if (req.params.id === "1") {
//     res.send({ data: todos[0] });
//   } else {
//     res.status(400);
//     res.send({ errors: ["id does not exist"] });
//   }
// });
// app.patch("/api/todo/:id", function (req, res) {
//   res.send({ data: todos[0] });
// });
// app.delete("/api/todo/:id", function (req, res) {
//   res.send({ data: todos[0] });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
