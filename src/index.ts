import express, { Express } from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import vehicleRoutes from "./routes/index";
import path from 'path';

const env:string = process.env.NODE_ENV ?? "development";
const envPath:string = path.resolve(
  process.cwd(),
  `.env${env === "development" ? "" : "." + env}`
);

dotenv.config({ path: envPath });
const app:Express = express();

const PORT:string | 3000 = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('NODE_ENV', process.env.NODE_ENV);

export { app, server };