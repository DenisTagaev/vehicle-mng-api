import { Request, Response } from "express";
import { getAllVehicles } from "../src/controllers/vehicles";
import Vehicle from "../src/models/vehicle";
//Only mock the required method to ensure the structure of the model remains usable 
jest.mock("../src/models/vehicle", () => ({
  find: jest.fn(),
}));

describe("getAllVehicles", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should fetch all vehicles and return them with a 200 status", async () => {
    const mockVehicles = [
      { year: 2020, make: "Toyota", model: "Corolla", trim: "SE" },
      { year: 2021, make: "Honda", model: "Civic", trim: "EX" },
    ];

    (Vehicle.find as jest.Mock).mockResolvedValue(mockVehicles);

    await getAllVehicles(req as Request, res as Response);

    expect(Vehicle.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVehicles);
  });

  it("should return a 500 status and an error message if an exception is thrown", async () => {
    (Vehicle.find as jest.Mock).mockRejectedValue(new Error("Server error"));

    await getAllVehicles(req as Request, res as Response);

    expect(Vehicle.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch vehicles",
    });
  });
});
