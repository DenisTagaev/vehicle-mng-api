"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const VehicleSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Vehicle", VehicleSchema);
