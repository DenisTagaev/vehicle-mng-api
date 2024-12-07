import { Request, Response } from "express";
import Vehicle from "../models/vehicle";

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
    const { year, make, model, trim } = req.body;

    const newVehicle = new Vehicle({
      year,
      make,
      model,
      trim,
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
};
