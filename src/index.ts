import express, { Express } from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import vehicleRoutes from "./routes/index";
import path from 'path';
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

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
// Middleware for security headers
app.use(helmet());
// Middleware for request logging
app.use(morgan(env === 'development' ? 'dev' : 'combined'));
// Middleware for response compression to improve performance
app.use(compression());

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running in ${env} mode on port ${PORT}`);
});

export { app, server };