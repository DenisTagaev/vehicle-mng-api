import express from "express";
import {
  getAllVehicles,
  createVehicle,
} from "../controllers/index";

const router = express.Router();

router.get("/", getAllVehicles);
router.post("/", createVehicle);

export default router;
