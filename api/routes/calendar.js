import express from "express";
import { getAllEvents } from "../controllers/calendar.js";

const router = express.Router()

router.get("/", getAllEvents)

export default router;