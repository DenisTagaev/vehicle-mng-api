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
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
      
      req = { params: { id: "111111111111111111111111" } };
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        jsonMock = res.json as jest.Mock;
        statusMock = res.status as jest.Mock;

     jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

    it("should return 400 if ID is invalid", async () => {
      // Invalid ID to trigger the validation
      req.params = { id: "invalid-id" };

      await deleteVehicle(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Invalid vehicle ID",
      });
    });

  it("should delete a vehicle and return it", async () => {
    const mockVehicle = {
      _id: "111111111111111111111111",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      trim: "LE",
    };
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(mockVehicle);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith(
      "111111111111111111111111"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVehicle);
  });

  it("should return 404 if the vehicle does not exist", async () => {
    (Vehicle.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith(
      "111111111111111111111111"
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Vehicle doesn't exist" });
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (Vehicle.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

    await deleteVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith(
      "111111111111111111111111"
    );
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
