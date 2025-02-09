// Imports with zero tarrifs!
import Fastify from 'fastify';
import cors from "@fastify/cors";

import helloRoutes from './routes/hello.route';
import areYouThereRoutes from './routes/areYouThere.route';
import userRoutes from './routes/database.route';
import { connectDB } from './config/mongo.config';


// Global application configuration happens here
const fastify = Fastify({ logger: true });
const PORT = parseInt(process.env.PORT ?? '3000', 10);
const HOST = process.env.BIND ?? '0.0.0.0';

// Database connections are here for now.  They need to be set in startup hooks later
// and decorated on the the global fastify object

// mongo:
connectDB();

// CORS access is set up here
const allowedOrigins = [
    "http://localhost:3000"
];

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
