"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicles_1 = require("../controllers/vehicles");
const router = express_1.default.Router();
router.route("/")
    .get(vehicles_1.getAllVehicles)
    .post(vehicles_1.createVehicle);
router.route("/:id")
    .put(vehicles_1.editVehicle)
    .delete(vehicles_1.deleteVehicle);
exports.default = router;
