import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { indexRouter } from "./routes";
import initMongoConnection from "./services/mongo-connection";

const app = express();

// configs
dotenv.config();
app.use(express.json());
app.use(cors());

// database init
// initMongoConnection();

// api index
// app.use("/api", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is up on port ${process.env.PORT || 8000}!`);
});
