import request from "supertest";
import { connection } from "mongoose";
import { server, app } from "../src"; 
import { connectDB } from "../src/config/db";
import * as vehicleController from "../src/controllers/vehicles"; 

beforeAll(async () => {
  await connectDB(); // Connect to test DB
});

afterAll(async () => {
  // Ensuring the database connection is closed after tests
  await connection.close();
  server.close();
});

// Mocking the vehicle controllers to isolate router tests and avoid invoking actual controller logic
jest.mock("../src/controllers/vehicles");

describe("Vehicle Router", () => {
  test("GET /api/vehicles - should trigger getAllVehicles controller", async () => {
    const mockGetAllVehicles = jest
      .spyOn(vehicleController, "getAllVehicles")
      .mockImplementation(async(req, res) => {
        res.status(200).json([]);
      });

    await request(app).get("/api/vehicles");
    expect(mockGetAllVehicles).toHaveBeenCalled();
  });

  test("POST /api/vehicles - should trigger createVehicle controller", async () => {
    const mockCreateVehicle = jest
      .spyOn(vehicleController, "createVehicle")
      .mockImplementation(async(req, res) => {
        res.status(201).json({ id: "12345" });
      });

    await request(app)
      .post("/api/vehicles")
      .send({ year: 2020, make: "Toyota", model: "Corolla", trim: "SE"  });
    expect(mockCreateVehicle).toHaveBeenCalled();
  });

  test("PUT /api/vehicles/:id - should trigger editVehicle controller", async () => {
    const mockEditVehicle = jest
      .spyOn(vehicleController, "editVehicle")
      .mockImplementation(async(req, res) => {
        res.status(200).json({ id: req.params.id });
      });

    await request(app)
      .put("/api/vehicles/1")
      .send({ year: 2021, make: "Honda", model: "Civic", trim: "SE" });
    expect(mockEditVehicle).toHaveBeenCalled();
  });

  test("DELETE /api/vehicles/:id - should trigger deleteVehicle controller", async () => {
    const mockDeleteVehicle = jest
      .spyOn(vehicleController, "deleteVehicle")
      .mockImplementation(async(req, res) => {
        res.status(200).json({ id: req.params.id });
      });

    await request(app).delete("/api/vehicles/1");
    expect(mockDeleteVehicle).toHaveBeenCalled();
  });
});