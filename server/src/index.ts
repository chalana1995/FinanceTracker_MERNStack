import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./route/financial-record"

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string =
  "mongodb+srv://chalanakalpitha72:cMmtQtXLAobgCrZV@cluster0.2ozatba.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Mongo DB Connected Successfully");
  })
  .catch((err) => {
    console.error("Failed to connect MongoDb", err);
  });

app.use("/finacial-records", financialRecordRouter)

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
