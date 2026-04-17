import express from "express";
import { addSchool, listSchools } from "../controllers/schoolControllers.js";

const router = express.Router();

router.post("/schools", addSchool);
router.get("/schools", listSchools);

export default router;