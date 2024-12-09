import { createVehicle } from "../src/controllers/vehicles";
import Vehicle from "../src/models/vehicle";
import { Request, Response } from "express";
//Ensuring that jest properly mocks the New instance behaviour
jest.mock("../src/models/vehicle", () => {
  const mockSave = jest.fn();
  const mockVehicle = jest.fn(() => ({
    save: mockSave,
  }));

  return jest.fn().mockImplementation(() => mockVehicle());
});


describe("createVehicle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new vehicle and return it", async () => {
    const vehicleData = {
      year: 2020,
      make: "Toyota",
      model: "Camry",
      trim: "LE",
    };

    // Mock the save method
    const mockSave = jest.fn().mockResolvedValue(vehicleData);

    (Vehicle as unknown as jest.Mock).mockImplementation(() => ({
      save: mockSave,
    }));

    const req = { body: vehicleData } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createVehicle(req, res);

    expect(Vehicle).toHaveBeenCalledWith(vehicleData); 
    expect(mockSave).toHaveBeenCalledTimes(1); 
    expect(res.status).toHaveBeenCalledWith(201); 
    expect(res.json).toHaveBeenCalledWith(vehicleData); 
  });

  it("should return a 500 status if an error occurs", async () => {
    const vehicleData = {
      year: 2020,
      make: "Toyota",
      model: "Camry",
      trim: "LE",
    };

    // Mock the save method to throw an error
    const mockSave = jest.fn().mockRejectedValue(new Error("Database error"));

    // Mock the Vehicle constructor
    (Vehicle as unknown as jest.Mock).mockImplementation(() => ({
      save: mockSave,
    }));

    const req = { body: vehicleData } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createVehicle(req, res);

    expect(Vehicle).toHaveBeenCalledWith(vehicleData); 
    expect(mockSave).toHaveBeenCalledTimes(1); 
    expect(res.status).toHaveBeenCalledWith(500); 
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create vehicle",
    });
  });
});
