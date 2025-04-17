import cors from "cors";
import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Book Shop");
});

export const App = app;
