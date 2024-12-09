"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.editVehicle = exports.createVehicle = exports.getAllVehicles = void 0;
const vehicle_1 = __importDefault(require("../models/vehicle"));
const getAllVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicle_1.default.find();
        res.status(200).json(vehicles);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicles" });
    }
});
exports.getAllVehicles = getAllVehicles;
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year, make, model, trim } = req.body;
        const newVehicle = new vehicle_1.default({
            year,
            make,
            model,
            trim,
        });
        const savedVehicle = yield newVehicle.save();
        res.status(201).json(savedVehicle);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create vehicle" });
    }
});
exports.createVehicle = createVehicle;
const editVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedVehicle = yield vehicle_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { new: true });
        if (!updatedVehicle) {
            res.status(404).json({ error: "Vehicle doesn't exist" });
            return;
        }
        res.status(200).json(updatedVehicle);
    }
    catch (error) {
        console.error("Error updating vehicle:", error);
        res.status(500).json({ error: "Failed to update vehicle" });
    }
});
exports.editVehicle = editVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedVehicle = yield vehicle_1.default.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            res.status(404).json({ error: "Vehicle doesn't exist" });
            return;
        }
        res.status(200).json(deletedVehicle);
    }
    catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ error: "Failed to delete vehicle" });
    }
});
exports.deleteVehicle = deleteVehicle;
