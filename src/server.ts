// Imports with zero tarrifs!
import Fastify, { FastifyPluginCallback } from "fastify";
import cors from "@fastify/cors";

import helloRoutes from "./routes/hello.route";
import areYouThereRoutes from "./routes/areYouThere.route";
import userRoutes from "./routes/database.route";
import { connectDB } from "./config/mongo.config";
import fastifySequelize from "fastify-sequelize";
import { initClientModel } from "./models/sequelize/client.model";
import { Options } from "sequelize";

// Global application configuration happens here
const fastify = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT ?? "3000", 10);
const HOST = process.env.BIND ?? "0.0.0.0";

// Database connections are here for now.  They need to be set in startup hooks later
// and decorated on the the global fastify object

// mongo:
connectDB();

// sequelize
const sequelizeOptions: Options = {
  dialect: "postgres",
  host: "localhost",
  database: "fastify-starter",
  username: "fastify-starter",
  password: "P@ssw0rd",
  logging: false,
  pool: { max: 10, min: 1, idle: 10000 },
};
fastify.register(fastifySequelize as FastifyPluginCallback<Options>, sequelizeOptions);

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

// After the show starts
fastify.after(async () => {
  // Ensure Sequelize is available
  if (!fastify.sequelize) {
    throw new Error("❌ Sequelize instance is missing in fastify!");
  }

  console.log("✅ Sequelize instance available, initializing models...");

  // 🔥 NEW: Log the entire `sequelize` instance to confirm structure
  console.log("🔥 Sequelize Instance Details:", fastify.sequelize);

  // 🔥 NEW: Log whether `queryGenerator` is available on `fastify.sequelize`
  console.log("🔥🔥🔥 Checking queryGenerator on fastify.sequelize:", (fastify.sequelize as any).QueryGenerator);


  // Initialize models
  initClientModel(fastify.sequelize);

  // Sync database (create tables if they don't exist)
  await fastify.sequelize.sync();
});


// This next bit sets up the server.  You shouldn't need to maintain this much.
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
