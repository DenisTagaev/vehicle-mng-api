import express from "express";
import {
  getAllVehicles,
  createVehicle,
} from "../controllers/vehicles";

const router = express.Router();

router.route("/")
  .get(getAllVehicles)
  .post(createVehicle);

export default router;
