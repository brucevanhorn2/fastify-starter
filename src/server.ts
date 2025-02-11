import Fastify from "fastify";
import { Sequelize, Options, Dialect, SyncOptions } from "sequelize";
import { initClientModel } from "./models/sequelize/client.model";

const PORT = parseInt(process.env.PORT ?? "3000", 10);
const HOST = process.env.BIND ?? "0.0.0.0";

const fastify = Fastify();

const sequelizeConfig: Options = {
  dialect: "postgres" as Dialect,
  host: process.env.DB_HOST ?? "localhost",
  database: process.env.DB_NAME ?? "fastify-starter",
  username: process.env.DB_USER ?? "fastify-starter",
  password: process.env.DB_PASSWORD ?? "P@ssw0rd",
  logging: process.env.DATABASE_LOGGING === "true",
  pool: { 
    max: process.env.DATABASE_POOL_MAX ? parseInt(process.env.DATABASE_POOL_MAX, 10) : 10, 
    min: process.env.DATABASE_POOL_MIN ? parseInt(process.env.DATABASE_POOL_MIN, 10) : 1,
    idle: process.env.DATABASE_POOL_IDLE ? parseInt(process.env.DATABASE_POOL_IDLE, 10) : 10000 
  },
};

const sequelize = new Sequelize(sequelizeConfig);

fastify.decorate("sequelize", sequelize);

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

fastify.after(async () => {
  initClientModel(fastify.sequelize);
  const syncOptions: SyncOptions = {
    force: process.env.DATABASE_SCHEMA_SYNC === "true",
    alter: process.env.DATABASE_SCHEMA_ALTER === "true"
  };
  await fastify.sequelize.sync(syncOptions);
  console.log("✅ Database synchronized!");
});

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
