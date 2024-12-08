import express, { Express } from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import vehicleRoutes from "./routes/index";

dotenv.config();
const app:Express = express();

const PORT:string | 3000 = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };