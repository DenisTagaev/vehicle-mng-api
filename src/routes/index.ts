import express from "express";
import {
  getAllVehicles,
  createVehicle,
  editVehicle, 
  deleteVehicle
} from "../controllers/vehicles";

const router = express.Router();

router.route("/")
  .get(getAllVehicles)
  .post(createVehicle);

router.route("/:id")
  .put(editVehicle)
  .delete(deleteVehicle);

export default router;
