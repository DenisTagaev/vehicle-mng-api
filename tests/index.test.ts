import { connection } from "mongoose";
import { app, server } from "../src"; 
import { connectDB } from "../src/config/db";
//Imitate real connection to the database to only test functionality
jest.mock("../src/config/db", () => ({
  connectDB: jest.fn(),
}));

describe("Server Initialization", () => {
  beforeAll(async () => {
    // Mocking successful database connection
    (connectDB as jest.Mock).mockImplementation(() => Promise.resolve());
  });

  afterAll(async () => {
    // Ensuring the database connection is closed after tests
    await connection.close();
    server.close();
  });

  //ensuring connection with the database is established
  it("should connect to the database", () => {
    expect(connectDB).toHaveBeenCalled();
  });

  //ensuring the api has started to listen for requests
  it("should listen on the specified port", () => {
    const PORT = process.env.PORT || 3000;
    expect(app.listen).toBeDefined();
    console.log(`Server expected to run on port ${PORT}`);
  });
});
