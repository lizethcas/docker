import express from "express";
import { config } from "dotenv";

config();
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello Worlddd!");
});

app.get("/health", (req, res) => {
  res.status(200).send({
    status: "ok",
    message: "Server is running",
    timestamp: new Date(),
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
