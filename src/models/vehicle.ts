import { Schema, model } from "mongoose";

export interface IVehicle {
    year: number;
    make: string;
    model: string;
    trim: string;
}

export interface IVehicleDocument extends IVehicle, Document {};

const VehicleSchema: Schema<IVehicleDocument> = new Schema({
  year: {
    type: Number,
    required: true,
    min: [1916, "Vehicles are tracked starting from 1916"],
  },
  make: {
    type: String,
    required: true,
    minLength: [3, "Car brands should have at least 3 characters"],
  },
  model: { type: String, required: true },
  trim: { type: String, required: true },
});

export default model<IVehicleDocument>("Vehicle", VehicleSchema);
