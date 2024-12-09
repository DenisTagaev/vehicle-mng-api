import { deleteVehicle } from "../src/controllers/vehicles";
import Vehicle from "../src/models/vehicle";
import { Request, Response } from "express";
//mock the behaviour of the query without connecting to the actual db
jest.mock("../src/models/vehicle", () => {
  const mockModel = {
    findByIdAndDelete: jest.fn(),
  };
  return mockModel;
});

describe("deleteVehicle", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: { id: "123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

     jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it("should delete a vehicle and return it", async () => {
    const mockVehicle = {
      _id: "123",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      trim: "LE",
    };
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(mockVehicle);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVehicle);
  });

  it("should return 404 if the vehicle does not exist", async () => {
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Vehicle doesn't exist" });
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (Vehicle.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to delete vehicle",
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error deleting vehicle:",
      error
    );
  });
});
