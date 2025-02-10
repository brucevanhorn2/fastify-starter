import Fastify from "fastify";
import { Sequelize } from "sequelize";
import { initClientModel } from "./models/sequelize/client.model";

const fastify = Fastify();

// ✅ Manually Instantiate Sequelize
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  database: "fastify-starter",
  username: "fastify-starter",
  password: "P@ssw0rd",
  logging: false,
  pool: { max: 10, min: 1, idle: 10000 },
});

// ✅ Attach Sequelize to Fastify **before accessing it**
fastify.decorate("sequelize", sequelize);

// ✅ Extend FastifyInstance only AFTER decorating
declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

fastify.after(async () => {
  console.log("✅ Checking Fastify Sequelize instance:", fastify.sequelize);

  if (!fastify.sequelize) {
    throw new Error("❌ Sequelize instance is missing in Fastify!");
  }

  console.log("✅ Sequelize instance available, initializing models...");
  initClientModel(fastify.sequelize);

  // ✅ Ensure database sync
  await fastify.sequelize.sync();
  console.log("✅ Database synchronized!");
});

fastify.listen({ port: 3000 }, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
