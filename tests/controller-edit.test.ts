import { Request, Response } from "express";
import { editVehicle } from "../src/controllers/vehicles";
import Vehicle from "../src/models/vehicle";
//mock the behaviour of the query without connecting to the actual db
jest.mock("../src/models/vehicle", () => {
  const mockModel = {
    findByIdAndUpdate: jest.fn(),
  };
  return mockModel;
});

describe("editVehicle", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    req = {
      params: { id: "111111111111111111111111" },
      body: {
        make: "Updated Make",
        model: "Updated Model",
        year: 2024,
        trim: "Updated Trim",
      },
    };

    res = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it("should return 400 if ID is invalid", async () => {
    // Invalid ID to trigger the validation
    req.params = { id:"invalid-id" };

    await editVehicle(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
        error: "Invalid vehicle ID",
    });
    });

  it("should update a vehicle and return the updated vehicle", async () => {
    const updatedVehicle = {
      _id: "111111111111111111111111",
      make: "Updated Make",
      model: "Updated Model",
      year: 2024,
      trim: "Updated Trim",
    };

    (Vehicle.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedVehicle);

    await editVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
      "111111111111111111111111",
      {
        make: "Updated Make",
        model: "Updated Model",
        year: 2024,
        trim: "Updated Trim",
      },
      { new: true }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(updatedVehicle);
  });

  it("should return 404 if the vehicle doesn't exist", async () => {
    (Vehicle.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await editVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
      "111111111111111111111111",
      {
        make: "Updated Make",
        model: "Updated Model",
        year: 2024,
        trim: "Updated Trim",
      },
      { new: true }
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Vehicle doesn't exist" });
  });

  it("should handle errors and return 500", async () => {
    const error = new Error("Database error");
    (Vehicle.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

    await editVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
      "111111111111111111111111",
      {
        make: "Updated Make",
        model: "Updated Model",
        year: 2024,
        trim: "Updated Trim",
      },
      { new: true }
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Failed to update vehicle",
    });
  });
});
