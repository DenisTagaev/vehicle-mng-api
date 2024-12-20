import { Request, Response } from "express";
import Vehicle from "../models/vehicle";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";

export const getAllVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sanitizedBody = mongoSanitize.sanitize(req.body);
    const { year, make, model, trim } = sanitizedBody;

    const newVehicle = new Vehicle({
      year,
      make: make.trim(),
      model: model.trim(),
      trim: trim.trim(),
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
};

export const editVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: "Invalid vehicle ID" });
      return; 
    }

    const sanitizedBody = mongoSanitize.sanitize(req.body);
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, { ...sanitizedBody}, { new: true });

    if (!updatedVehicle) {
      res.status(404).json({ error: "Vehicle doesn't exist" });
      return;
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Failed to update vehicle" });
  }
}

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: "Invalid vehicle ID" });
      return;
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!deletedVehicle) {
      res.status(404).json({ error: "Vehicle doesn't exist" });
      return;
    }

    res.status(200).json(deletedVehicle);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      res.status(500).json({ error: "Failed to delete vehicle" });
    } 
}