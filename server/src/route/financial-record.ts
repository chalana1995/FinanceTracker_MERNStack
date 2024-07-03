import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/finacial-record";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const saveRecord = await newRecord.save();

    res.status(200).send(saveRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/:id", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const id = req.params.id;

    const updateRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!updateRecord) return res.status(404).send();

    res.status(200).send(updateRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();

    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
