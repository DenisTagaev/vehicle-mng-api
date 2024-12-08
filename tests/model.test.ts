import VehicleModel, { IVehicle } from "../src/models/vehicle";
//retain the original Model behaviour to allow directly construct instances
jest.mock("mongoose", () => {
  const originalMongoose = jest.requireActual("mongoose");
  return {
    ...originalMongoose,
    Model: originalMongoose.Model,
  };
});

describe("Vehicle Model", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
    afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate a valid vehicle schema", async () => {
    const vehicleData: IVehicle = {
      year: 2020,
      make: "Toyota",
      model: "Corolla",
      trim: "LE",
    };

    const vehicle = new VehicleModel(vehicleData);
    await vehicle.validate();
    expect(vehicle).toMatchObject(vehicleData);
  });

  it("should throw a validation error for invalid year", async () => {
    const vehicleData: IVehicle = {
      year: 1900,
      make: "Toyota",
      model: "Corolla",
      trim: "LE",
    };

    const vehicle = new VehicleModel(vehicleData);

    await expect(vehicle.validate()).rejects.toThrow(
      "Vehicles are tracked starting from 1916"
    );
  });

  it("should throw a validation error for invalid make length", async () => {
    const vehicleData: IVehicle = {
      year: 2020,
      make: "To",
      model: "Corolla",
      trim: "LE",
    };

    const vehicle = new VehicleModel(vehicleData);

    await expect(vehicle.validate()).rejects.toThrow(
      "Car brands should have at least 3 characters"
    );
  });
});
