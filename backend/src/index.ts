import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { todosRouter } from "./routes/todosRouter";

const app = express();
const port = 3002;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
