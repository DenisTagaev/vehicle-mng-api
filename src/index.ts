import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import vehicleRoutes from "./routes/index";

dotenv.config();
const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
