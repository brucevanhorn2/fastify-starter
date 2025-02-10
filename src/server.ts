// Imports with zero tariffs!
import Fastify from "fastify";
import cors from "@fastify/cors";

import helloRoutes from "./routes/hello.route";
import areYouThereRoutes from "./routes/areYouThere.route";
import userRoutes from "./routes/database.route";
import { connectDB } from "./config/mongo.config";
import { initClientModel } from "./models/sequelize/client.model";
import { Sequelize } from "sequelize";

// Global application configuration happens here
const fastify = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT ?? "3000", 10);
const HOST = process.env.BIND ?? "0.0.0.0";

// Database connections are here for now. They need to be set in startup hooks later
// and decorated on the global fastify object

// ✅ MongoDB Connection
connectDB();

// ✅ Sequelize Connection (Manually Registered)
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  database: "fastify-starter",
  username: "fastify-starter",
  password: "P@ssw0rd",
  logging: false,
  pool: { max: 10, min: 1, idle: 10000 },
});

// ✅ Attach Sequelize to Fastify instance
fastify.decorate("sequelize", sequelize as Sequelize);
console.log("🔥🔥🔥🔥🔥🔥 Fastify Instance Keys:", Object.keys(fastify));

// CORS access is set up here
const allowedOrigins = ["http://localhost:3000"];
fastify.register(cors, {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Connection",
    "Cache-Control",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  origin: allowedOrigins,
});

// Routes are registered here
fastify.register(helloRoutes);
fastify.register(areYouThereRoutes);
fastify.register(userRoutes);

// ✅ After Fastify is ready, initialize the database
fastify.after(async () => {
  // Ensure Sequelize is available
  if (!fastify.sequelize) {
    throw new Error("❌ Sequelize instance is missing in Fastify!");
  }

  console.log("✅ Sequelize instance available, initializing models...");

  // 🔥 Log the entire `sequelize` instance to confirm structure
  console.log("🔥 Sequelize Instance Details:", fastify.sequelize);

  // 🔥 Log whether `queryGenerator` is available on `fastify.sequelize`
  console.log(
    "🔥🔥🔥 Checking queryGenerator on fastify.sequelize:",
    (fastify.sequelize as any).queryGenerator
  );

  // ✅ Initialize models
  initClientModel(fastify.sequelize);

  // ✅ Sync database (create tables if they don't exist)
  try {
    await fastify.sequelize.sync();
    console.log("✅ Database synchronized successfully!");
  } catch (err) {
    console.error("❌ Sequelize sync error:", err);
  }
});

// ✅ Server Start Function (No Maintenance Needed)
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
