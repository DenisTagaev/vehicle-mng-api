import { Request, Response } from "express";
import { editVehicle } from "../src/controllers/vehicles";
import Vehicle from "../src/models/vehicle";

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
      params: { id: "testID" },
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

  it("should update a vehicle and return the updated vehicle", async () => {
    const updatedVehicle = {
      _id: "testID",
      make: "Updated Make",
      model: "Updated Model",
      year: 2024,
      trim: "Updated Trim",
    };

    (Vehicle.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedVehicle);

    await editVehicle(req as Request, res as Response);

    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
      "testID",
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
      "testID",
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
      "testID",
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
