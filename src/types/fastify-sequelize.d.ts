import { Sequelize } from "sequelize";
import "fastify"; // Extend FastifyInstance

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}
